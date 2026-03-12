// app/api/questions/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { examId, questionText, options, correctOption, marks } =
      await req.json();

    if (
      !examId ||
      !questionText ||
      !Array.isArray(options) ||
      options.length !== 4
    ) {
      return NextResponse.json(
        { message: "Invalid question data" },
        { status: 400 },
      );
    }

    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");

    const exam = await examsCol.findOne({
      _id: new ObjectId(examId),
      instructorEmail: session.user.email,
    });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    if (exam.published) {
      return NextResponse.json(
        { message: "Cannot add questions after publish" },
        { status: 400 },
      );
    }

    const count = await questionsCol.countDocuments({ examId });
    if (count >= exam.totalQuestions) {
      return NextResponse.json(
        { message: "Question limit reached" },
        { status: 400 },
      );
    }

    await questionsCol.insertOne({
      examId, // ✅ stored as STRING (matches your DB)
      questionText,
      options,
      correctOption,
      marks,
      instructorEmail: session.user.email,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Question added successfully" });
  } catch (error) {
    console.error("POST /api/questions error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
