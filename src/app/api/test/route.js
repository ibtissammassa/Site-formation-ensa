import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = User.findById("6633acf6bef88208e48c9530");
  console.log(user);
  return NextResponse.json({ message: "db working nicely", status: 200 });
}
