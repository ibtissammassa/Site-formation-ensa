import TravailAR from "@/schema/travailARSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

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
    const travailARs = await TravailAR.find();

    return NextResponse.json({ travailARs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
