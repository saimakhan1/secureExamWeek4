// app/api/student/exams/[examId]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");

    const exam = await examsCol.findOne({
      _id: new ObjectId(params.examId),
      published: true,
      batchNames: { $in: session.user.batch ? [session.user.batch] : [] },
    });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    const examQuestions = await questionsCol
      .find({ examId: exam._id.toString() })
      .project({ correctOption: 0 }) // hide answers
      .toArray();

    return NextResponse.json({
      ...exam,
      questions: examQuestions,
    });
  } catch (err) {
    console.error("GET /api/student/exams/[examId] error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
