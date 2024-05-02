import { connect } from "@/dbConfig/dbConfig";
import User, { UserRoles } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { nom, prenom, numeroTele, cin, email, motDePass, role } = reqBody;
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
      role: role,
    });
    const savedUser = await newUser.save();
    const userId = savedUser._id;
    console.log("User id in login : " + userId);

    await sendEmail({ email, emailType: "verify", userId: userId });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
