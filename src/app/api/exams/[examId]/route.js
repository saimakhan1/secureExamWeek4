import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const params = await context.params; // ✅ Next.js 16 Turbopack fix
    const { examId } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");
    const theoryCol = await getCollection("theoryQuestions");

    // Fetch exam document
    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    let questions = [];

    // Decide which collection to fetch based on exam type
    if (exam.type === "mcq") {
      // MCQ collection
      questions = await questionsCol
        .find({ examId: exam._id.toString() }) // examId stored as string
        .toArray();
    } else if (exam.type === "theory") {
      // Theory collection
      questions = await theoryCol
        .find({ examId: exam._id.toString() }) // examId stored as string
        .toArray();
    }

    // Map _id to string for frontend
    questions = questions.map((q) => ({ ...q, _id: q._id.toString() }));

    return NextResponse.json({
      exam: {
        ...exam,
        _id: exam._id.toString(),
        questions,
      },
    });
  } catch (error) {
    console.error("GET /api/exams/[examId] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
