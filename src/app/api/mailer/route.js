import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/lib/mailer";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { email } = request.json();
    const user = User({
      prenom: "Hossam",
      nom: "Tamawi",
      email: "Naoufaljrh2000@gmail.com",
      motDePass: "password",
      role: "unverified student",
    });
    const saveduser = user.save();
    await sendEmail({ email, emailType: "verify", userId: saveduser._id });
    return NextResponse.json({
      message: "email sent seccusfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
