import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

// Get modules of a prof
export async function GET(request, { params }) {
  try {
    const { prof_id } = params;
    const modules = await Module.find({ profId: prof_id });
    if (!modules) {
      return NextResponse.json({ error: "Modules not found" }, { status: 404 });
    }
    return NextResponse.json({ modules });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
