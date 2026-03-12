//api/questions/create/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const instructorEmail = session.user.email;

    const body = await req.json();
    const { examId, questionText, options, correctOption, marks, category } =
      body;

    if (!examId || !questionText) {
      return NextResponse.json(
        { message: "examId and questionText required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");
    const questionsCollection = await getCollection("questions");

    const exam = await examsCollection.findOne({
      _id: new ObjectId(examId),
      instructorEmail,
    });

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found or unauthorized" },
        { status: 404 },
      );
    }

    const newQuestion = {
      examId,
      questionText,
      options: options || ["", "", "", ""],
      correctOption: correctOption ?? 0,
      marks: marks || 1,
      category: category || "",
      instructorEmail,
      createdAt: new Date(),
    };

    const insertResult = await questionsCollection.insertOne(newQuestion);

    const savedQuestion = {
      ...newQuestion,
      _id: insertResult.insertedId,
    };

    await examsCollection.updateOne(
      { _id: new ObjectId(examId) },
      {
        $push: { questions: savedQuestion },
        $inc: {
          questionsCount: 1,
          totalMarks: savedQuestion.marks,
        },
        $set: { updatedAt: new Date() },
      },
    );

    return NextResponse.json({
      success: true,
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Create MCQ Question Error:", error);
    return NextResponse.json(
      { message: "Failed to create question" },
      { status: 500 },
    );
  }
}
