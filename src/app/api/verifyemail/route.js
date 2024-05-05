import { connect } from "@/dbConfig/dbConfig";
import User from "@/schema/userSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const verificationToken = request.nextUrl.searchParams.get("token");
    const user = await User.findOne({
      verifyToken: verificationToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or token not saved in db" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
