import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

// Get module by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const module = await Module.findOne({ _id: id });
    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    return NextResponse.json({ module });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
