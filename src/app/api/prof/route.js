import User from "@/schema/userSchema";
import UserRoles from "@/schema/userRoles";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

await connect();

export async function GET(request) {
  try {
    const role = UserRoles.Teacher;
    const profs = await User.find({ role: role });

    return NextResponse.json({ profs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const role = UserRoles.Teacher;
    const {
      firstname,
      lastname,
      email,
      password,
      Image,
    } = await request.json();

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      role,
      Image,
    });

    await user.save();

    return NextResponse.json({ message: "Prof created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
