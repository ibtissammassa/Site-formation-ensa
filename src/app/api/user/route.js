import { connect } from "@/dbConfig/dbConfig";
import User from "@/schema/userSchema";
import UserRoles from "@/schema/userRoles";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/lib/mailer";
import jwt from "jsonwebtoken";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { nom, prenom, numeroTele, cin, email, motDePass, role, semester } =
      reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(motDePass, salt);

    // create a user in the database
    const newUser = new User({
      firstname: prenom,
      lastname: nom,
      phoneNumber: numeroTele,
      cin: cin,
      email: email,
      password: hashedPassword,
      isVerified: false,
      role: role,
      semester: semester,
    });
    const savedUser = await newUser.save();
    console.log("saved user : ", savedUser);
    const userId = savedUser._id;
    // send the email
    await sendEmail({ email, emailType: "verify", userId: userId.toString() });
    // set the token so the user will be sign in automaticly
    const tokenData = {
      id: savedUser._id,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      email: savedUser.email,
      isVerified: savedUser.isVerified,
      role: savedUser.role,
    };
    console.log("token data : ", tokenData);
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const users = await User.find({ role: UserRoles.UnverifiedStudent });
    return NextResponse.json({ users: users, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
