import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

connect();
export async function GET() {
  try {
    await sendEmail({
      email: "naoufaljrh2000@gmail.com",
      emailType: "verify",
      userId: "6633acf6bef88208e48c9530",
    });
    return NextResponse.json({
      message: "email sent seccusfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
