import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

// Get modules of a semester
export async function GET(request, { params }) {
  try {
    const { semester } = params;
    const modules = await Module.find({ semester: { $lte: semester } });
    if (!modules) {
      return NextResponse.json({ error: "Modules not found" }, { status: 404 });
    }
    return NextResponse.json({ modules });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
