import { connect } from "@/dbConfig/dbConfig";
import Module from "@/schema/moduleSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

// Get module by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const module = await Module.findOne({ slug }).populate({
      path: "chapitres",
      populate: { path: "ressources" },
    });

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    return NextResponse.json({ module });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update module by slug
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const updateData = await request.json();
    const updatedModule = await Module.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });
    if (!updatedModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Module updated successfully",
      updatedModule,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Add chapitre to module by slug
export async function POST(request, { params }) {
  try {
    const { slug } = params;
    const { chapitre } = await request.json();
    const module = await Module.findOne({ slug });

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    module.chapitres.push(chapitre);
    await module.save();

    return NextResponse.json({
      message: "Chapitre added successfully",
      module,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete module by slug
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const deletedModule = await Module.findOneAndDelete({ slug });
    if (!deletedModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Module deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
