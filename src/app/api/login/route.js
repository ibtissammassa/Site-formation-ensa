import { connect } from "@/dbConfig/dbConfig";
import User, { UserRoles } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // if credentials are correct :
    // create a jwt, incrept it and send it to the user cookies
    const tokenData = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      semester: user.semester,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log(token);

    const responce = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    responce.cookies.set("token", token, { httpOnly: true });
    return responce;
  } catch (error) {
    return NextResponse.json(
      { error: "There was a proble in login route" },
      { status: 500 }
    );
  }
}
