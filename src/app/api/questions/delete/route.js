// File: app/api/questions/delete/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { questionId } = await req.json();
    if (!questionId) {
      return NextResponse.json(
        { message: "Missing questionId" },
        { status: 400 },
      );
    }

    const questionsCol = await getCollection("questions");

    const question = await questionsCol.findOne({
      _id: new ObjectId(questionId),
    });
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }
    if (question.instructorEmail !== session.user.email) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    await questionsCol.deleteOne({ _id: new ObjectId(questionId) });

    return NextResponse.json({ message: "MCQ question deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/questions/delete error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
