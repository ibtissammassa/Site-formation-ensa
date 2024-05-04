import User from "@/schema/userSchema";
import UserRoles from "@/schema/userRoles";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

await connect();

// Get prof by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const role = UserRoles.Teacher;
    const prof = await User.findOne({ _id: id, role: role });
    if (!prof) {
      return NextResponse.json({ error: "Prof not found" }, { status: 404 });
    }
    return NextResponse.json({ prof });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update prof by id
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const role = UserRoles.Teacher;
    const updateData = await request.json();
    const updatedProf = await User.findOneAndUpdate(
      { _id: id, role: role },
      updateData,
      {
        new: true,
      }
    );
    if (!updatedProf) {
      return NextResponse.json({ error: "Prof not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Prof updated successfully",
      updatedProf,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const role = UserRoles.Teacher;
    const deletedProf = await User.findOneAndDelete({ _id: id, role: role });

    if (!deletedProf) {
      return NextResponse.json({ error: "Prof not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Prof deleted successfully",
      deletedProf,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
