import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

// GET: fetch student's results
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const resultsCollection = await getCollection("results");

    const results = await resultsCollection
      .find({ studentEmail: session.user.email })
      .toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/results error:", error);
    return NextResponse.json(
      { message: "Failed to fetch results" },
      { status: 500 },
    );
  }
}

// POST: submit exam result
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { examId, score, totalMarks } = await req.json();

    if (!examId || score === undefined || totalMarks === undefined) {
      return NextResponse.json(
        { message: "Missing examId, score, or totalMarks" },
        { status: 400 },
      );
    }

    const resultsCollection = await getCollection("results");

    // Prevent multiple submissions
    const existingResult = await resultsCollection.findOne({
      studentEmail: session.user.email,
      examId,
    });

    if (existingResult) {
      return NextResponse.json(
        { message: "You have already submitted this exam" },
        { status: 400 },
      );
    }

    const result = {
      studentEmail: session.user.email,
      examId,
      score,
      totalMarks,
      submittedAt: new Date(),
    };

    await resultsCollection.insertOne(result);

    return NextResponse.json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("POST /api/results error:", error);
    return NextResponse.json(
      { message: "Failed to save result" },
      { status: 500 },
    );
  }
}
