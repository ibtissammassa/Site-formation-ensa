import TravailAR from "@/schema/travailARSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import Ressources from "@/schema/ressourcesSchema";

await connect();

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const travail = await TravailAR.findOne({ slug });
    const moduleId = travail.module;
    const course = await Module.findOne({ _id: moduleId });
    travail.module = course;
    const updatedRessources = await Promise.all(
      travail.ressources.map(async (ressourceId) => {
        const resourceData = await Ressources.findById(ressourceId);
        return resourceData;
      })
    );

    travail.ressources = updatedRessources;
    if (!travail) {
      return NextResponse.json(
        { error: "TravailAR not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ travail });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const updateData = await request.json();

    const updatedTravailAR = await TravailAR.findOneAndUpdate(
      { slug },
      updateData,
      {
        new: true,
      }
    );

    if (!updatedTravailAR) {
      return NextResponse.json(
        { error: "TravailAR not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "TravailAR updated successfully",
      updatedTravailAR,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;

    const deletedTravailAR = await TravailAR.findOneAndDelete({ slug });

    if (!deletedTravailAR) {
      return NextResponse.json(
        { error: "TravailAR not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "TravailAR deleted successfully",
      deletedTravailAR,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
