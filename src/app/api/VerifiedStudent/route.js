import User, { UserRoles } from "@/schema/userSchema";
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
