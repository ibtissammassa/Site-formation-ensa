import User from "@/schema/userSchema";
import UserRoles from "@/schema/userRoles";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

await connect();

export async function GET(request) {
  try {
    const verifiedStudents = await User.find({ role: "verified student" });

    return NextResponse.json({ verifiedStudents });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const role = UserRoles.VerifiedStudent;
    const { studentId } = await request.json();
    await User.findByIdAndUpdate(studentId, { role: role });
    return NextResponse.json({
      message: "Student verified successfuly",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
