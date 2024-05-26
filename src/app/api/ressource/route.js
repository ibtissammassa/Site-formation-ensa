import { connect } from "@/dbConfig/dbConfig";
import Ressources from "@/schema/ressourcesSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { ressources } = reqBody;

    // const ressource = await Ressources.findOne({ title, url });

    // if (ressource) {
    //   return NextResponse.json(
    //     { error: "Ressource already exists" },
    //     { status: 400 }
    //   );
    // }

    // const newRessource = new Ressources({ title, url });

    // const savedRessource = await newRessource.save();

    const savedRessources = await Ressources.insertMany(ressources);

    return NextResponse.json({
      message: "Ressources created successfully",
      success: true,
      savedRessources,
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
