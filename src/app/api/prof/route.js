import User from "@/schema/userSchema";
import UserRoles from "@/schema/userRoles";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

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
    const { nom, prenom, numeroTele, cin, email, motDePass, Image } =
      await request.json();

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(motDePass, salt);

    const user = new User({
      firstname: prenom,
      lastname: nom,
      phoneNumber: numeroTele,
      cin: cin,
      email: email,
      password: hashedPassword,
      role: role,
      Image,
    });

    await user.save();

    return NextResponse.json({ message: "Prof created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
