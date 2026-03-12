//app/api/exam-attempts/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { examId, answers } = await req.json();
    const attemptsCollection = await getCollection("examAttempts");
    const examsCollection = await getCollection("exams");

    // Check if already submitted
    const existing = await attemptsCollection.findOne({
      examId,
      studentEmail: session.user.email,
    });
    if (existing)
      return NextResponse.json(
        { message: "Already submitted" },
        { status: 403 },
      );

    // Fetch exam to validate
    const exam = await examsCollection.findOne({ _id: examId });
    if (!exam)
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });

    // TODO: Check student batch access if required
    // const batchAllowed = exam.batchIds.includes(session.user.batchId);
    // if (!batchAllowed) return NextResponse.json({ message: "Access denied" }, { status: 403 });

    let totalMarks = 0;
    if (exam.examType === "MCQ") {
      answers.forEach((a) => {
        const q = exam.questions.find((q) => q._id === a.questionId);
        if (q && q.correctAnswer === a.answer) totalMarks++;
      });
    }

    await attemptsCollection.insertOne({
      examId,
      studentEmail: session.user.email,
      answers,
      totalMarks: exam.examType === "MCQ" ? totalMarks : null,
      graded: exam.examType === "Theoretical" ? false : true,
      submittedAt: new Date(),
    });

    return NextResponse.json({
      message: "Exam submitted successfully",
      totalMarks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit exam" },
      { status: 500 },
    );
  }
}
