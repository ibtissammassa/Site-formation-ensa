import Submissions from "@/schema/submissionsSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { submissions } = reqBody;

    const savedSubmissions = await Submissions.insertMany(submissions);

    return NextResponse.json({
      message: "Submissions created successfully",
      success: true,
      savedSubmissions,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const submissions = await Submissions.find();
    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
