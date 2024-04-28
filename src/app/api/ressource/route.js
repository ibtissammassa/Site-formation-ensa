import { connect } from "@/dbConfig/dbConfig";
import Ressources from "@/schema/ressourcesSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { title, url } = reqBody;

    const ressource = await Ressources.findOne({ title, url });

    if (ressource) {
      return NextResponse.json(
        { error: "Ressource already exists" },
        { status: 400 }
      );
    }

    const newRessource = new Ressources({ title, url });

    const savedRessource = await newRessource.save();

    return NextResponse.json({
      message: "Ressource created successfully",
      success: true,
      savedRessource,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const ressources = await Ressources.find();
    return NextResponse.json({ ressources });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
