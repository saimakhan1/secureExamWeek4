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

    const {
      questionId,
      questionText,
      options,
      correctOption,
      marks,
      category,
    } = await req.json();

    if (
      !questionId ||
      !questionText ||
      !marks ||
      !options ||
      correctOption === undefined
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const mcqCol = await getCollection("questions");
    const examsCol = await getCollection("exams");

    const question = await mcqCol.findOne({ _id: new ObjectId(questionId) });
    if (!question)
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );

    // ⚡ Only check instructor if instructorEmail exists
    if (
      question.instructorEmail &&
      question.instructorEmail.toLowerCase() !==
        session.user.email.toLowerCase()
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await mcqCol.updateOne(
      { _id: new ObjectId(questionId) },
      {
        $set: {
          questionText,
          options,
          correctOption,
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
          "questions.$[elem].options": options,
          "questions.$[elem].correctOption": correctOption,
          "questions.$[elem].marks": Number(marks),
          "questions.$[elem].category": category || question.category,
          "questions.$[elem].updatedAt": new Date(),
        },
      },
      { arrayFilters: [{ "elem._id": questionId }] },
    );

    return NextResponse.json({ message: "MCQ question updated successfully" });
  } catch (err) {
    console.error("PATCH /api/questions/edit error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
