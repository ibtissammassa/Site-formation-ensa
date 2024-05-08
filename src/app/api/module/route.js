import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      coverImage,
      progress,
      date_debut,
      name,
      slug,
      date_fin,
      objectif,
      volume_horaire,
      chapitres,
      semester,
      prof,
    } = reqBody;

    const module = await Module.findOne({ slug });

    if (module) {
      return NextResponse.json(
        { error: "Module already exists" },
        { status: 400 }
      );
    }

    const newModule = new Module({
      coverImage,
      progress,
      date_debut,
      name,
      slug,
      date_fin,
      objectif,
      volume_horaire,
      chapitres,
      semester,
      prof,
    });

    const savedModule = await newModule.save();

    return NextResponse.json({
      message: "Module created successfully",
      success: true,
      savedModule,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const prof = searchParams.get("prof");
    const semester = searchParams.get("semester");
    let modules;
    if (prof) {
      modules = await Module.find({ "prof.profId": prof });
    } else if (semester) {
      modules = await Module.find({ semester: { $lte: semester } });
    } else {
      modules = await Module.find();
    }
    return NextResponse.json({ modules });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
