// //api/theory-questions/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "instructor") {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const { examId, questionText, marks } = await req.json();

//     if (!examId || !questionText || !marks) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields" }),
//         { status: 400 },
//       );
//     }

//     const theoryCol = await getCollection("theoryQuestions");

//     // Store examId as string to match submissions
//     await theoryCol.insertOne({
//       examId: String(examId),
//       questionText,
//       marks: Number(marks),
//       createdAt: new Date(),
//     });

//     return new Response(
//       JSON.stringify({ message: "Theory question added successfully" }),
//       { status: 201 },
//     );
//   } catch (err) {
//     console.error("Add theory question error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

//....
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { examId, questionText, marks, category } = await req.json();

    if (!examId || !questionText || !marks) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 },
      );
    }

    const theoryCol = await getCollection("theoryQuestions");

    const newQuestion = {
      examId: String(examId),
      questionText,
      marks: Number(marks),
      category: category || "",
      createdAt: new Date(),
    };

    const result = await theoryCol.insertOne(newQuestion);

    const savedQuestion = {
      ...newQuestion,
      _id: result.insertedId,
    };

    return new Response(
      JSON.stringify({
        message: "Theory question added successfully",
        question: savedQuestion, // ⭐ THIS FIXES YOUR FRONTEND
      }),
      { status: 201 },
    );
  } catch (err) {
    console.error("Add theory question error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
