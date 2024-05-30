import Submissions from "@/schema/submissionsSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import User from "@/schema/userSchema";
import TravailAR from "@/schema/travailARSchema";
import Ressources from "@/schema/ressourcesSchema";
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
    const travailId = request.nextUrl.searchParams.get("travailId");
    const userId = request.nextUrl.searchParams.get("userId");
    const submissions = userId
      ? await Submissions.find({
          travail: travailId,
          student: userId,
        }).populate("ressources")
      : await Submissions.find({ travail: travailId })
          .populate("ressources")
          .populate("student")
          .populate("travail");

    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
