import TravailAR from "@/schema/travailARSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import Ressources from "@/schema/ressourcesSchema";
import mongoose from "mongoose";

await connect();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const {
      title,
      slug,
      moduleId,
      delais,
      rendu,
      detail,
      ressources,
    } = requestBody;

    const travail = await TravailAR.findOne({ slug });

    if (travail) {
      return NextResponse.json(
        { error: "TravailAR already exists" },
        { status: 400 }
      );
    }

    const newTravailAR = new TravailAR({
      title,
      slug,
      module: moduleId,
      delais,
      rendu,
      detail,
      ressources,
    });

    const savedTravailAR = await newTravailAR.save();

    return NextResponse.json({
      message: "TravailAR created successfully",
      success: true,
      savedTravailAR,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    var ObjectId = mongoose.Types.ObjectId;
    let travailARs = await TravailAR.find()
      .populate("module")
      .populate("ressources");
    const { searchParams } = new URL(request.url);
    let prof = searchParams.get("prof");
    let semester = searchParams.get("semester");

    if (prof) {
      prof = new ObjectId(prof);
      travailARs = travailARs.filter((travailAR) => {
        return travailAR.module.prof.profId.equals(prof);
      });
    } else if (semester) {
      semester = parseInt(semester);
      travailARs = travailARs.filter((travailAR) => {
        return travailAR.module.semester === semester;
      });
    }

    return NextResponse.json({ travailARs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
