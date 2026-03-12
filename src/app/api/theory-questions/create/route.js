import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "instructor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { examId, questionText, marks, category } = await req.json();

  const theoryCol = await getCollection("theoryQuestions");

  const question = {
    examId: new ObjectId(examId),
    questionText,
    marks: Number(marks),
    category,
    instructorEmail: session.user.email,
    createdAt: new Date(),
  };

  const result = await theoryCol.insertOne(question);

  return NextResponse.json({
    message: "Question added",
    question: { ...question, _id: result.insertedId },
  });
}
