import { getDataFromToken } from "@/app/actions";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const newToken = await request.json();
    const updatedToken = await getDataFromToken();
    console.log("old token data :", updatedToken);
    //update the oldToken
    Object.keys(newToken).forEach((key) => {
      if (updatedToken[key] !== newToken[key]) {
        updatedToken[key] = newToken[key];
      }
    });
    console.log("new token data :", updatedToken);
    // set the updated token as the new token
    const token = jwt.sign(updatedToken, process.env.JWT_SECRET_KEY);
    const responce = NextResponse.json({
      message: "test",
      success: true,
      status: 200,
    });
    responce.cookies.set("token", token, { httpOnly: true });
    return responce;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
