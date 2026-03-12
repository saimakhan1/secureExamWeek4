// // File: app/api/theory-questions/delete/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function DELETE(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { questionId } = await req.json();
//     if (!questionId) {
//       return NextResponse.json(
//         { message: "Missing questionId" },
//         { status: 400 },
//       );
//     }

//     const theoryCol = await getCollection("theoryQuestions");

//     const question = await theoryCol.findOne({ _id: new ObjectId(questionId) });
//     if (!question) {
//       return NextResponse.json(
//         { message: "Question not found" },
//         { status: 404 },
//       );
//     }
//     if (question.instructorEmail !== session.user.email) {
//       return NextResponse.json({ message: "Unauthorized", status: 401 });
//     }

//     await theoryCol.deleteOne({ _id: new ObjectId(questionId) });

//     return NextResponse.json({
//       message: "Theory question deleted successfully",
//     });
//   } catch (err) {
//     console.error("DELETE /api/theory-questions/delete error:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

//........

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { questionId } = await req.json();
    if (!questionId) {
      return NextResponse.json(
        { message: "Missing questionId" },
        { status: 400 },
      );
    }

    const theoryCol = await getCollection("theoryQuestions");
    const examsCol = await getCollection("exams");

    const question = await theoryCol.findOne({ _id: new ObjectId(questionId) });
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }

    // Only check instructor if the field exists
    if (
      question.instructorEmail &&
      question.instructorEmail.toLowerCase() !==
        session.user.email.toLowerCase()
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Delete from theoryQuestions collection
    await theoryCol.deleteOne({ _id: new ObjectId(questionId) });

    // 2️⃣ Remove from all exams that contain this question
    await examsCol.updateMany(
      { "questions._id": questionId },
      { $pull: { questions: { _id: questionId } } },
    );

    return NextResponse.json({
      message: "Theory question deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/theory-questions/delete error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
