import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { questionId, questionText, marks, category } = await req.json();

    if (!questionId || !questionText || !marks) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const theoryCol = await getCollection("theoryQuestions");
    const examsCol = await getCollection("exams");

    const question = await theoryCol.findOne({ _id: new ObjectId(questionId) });
    if (!question)
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );

    if (
      question.instructorEmail &&
      question.instructorEmail.toLowerCase() !==
        session.user.email.toLowerCase()
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await theoryCol.updateOne(
      { _id: new ObjectId(questionId) },
      {
        $set: {
          questionText,
          marks: Number(marks),
          category: category || question.category,
          updatedAt: new Date(),
        },
      },
    );

    await examsCol.updateMany(
      { "questions._id": questionId },
      {
        $set: {
          "questions.$[elem].questionText": questionText,
          "questions.$[elem].marks": Number(marks),
          "questions.$[elem].category": category || question.category,
          "questions.$[elem].updatedAt": new Date(),
        },
      },
      { arrayFilters: [{ "elem._id": questionId }] },
    );

    return NextResponse.json({
      message: "Theory question updated successfully",
    });
  } catch (err) {
    console.error("PATCH /api/theory-questions/edit error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
