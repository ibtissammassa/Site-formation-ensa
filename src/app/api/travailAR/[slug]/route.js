import TravailAR from "@/schema/travailARSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

await connect();

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const travail = await TravailAR.findOne({ slug });
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
