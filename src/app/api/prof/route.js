import User, { UserRoles } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

await connect();

export async function GET(request) {
  try {
    const profs = await User.find({ role: "teacher" });

    return NextResponse.json({ profs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
