// //src/app/api/student/exam/[examId]/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET(req, context) {
//   try {
//     // ✅ Get current session
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "student") {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Next.js 16: unwrap params
//     const params = await context.params;
//     const examId = params.examId;

//     if (!ObjectId.isValid(examId)) {
//       return Response.json({ message: "Invalid exam ID" }, { status: 400 });
//     }

//     // Collections
//     const examsCol = await getCollection("exams");
//     const questionsCol = await getCollection("questions"); // MCQs
//     const theoryCol = await getCollection("theoryQuestions"); // Theory questions
//     const batchesCol = await getCollection("batches");

//     // Find exam
//     const exam = await examsCol.findOne({
//       _id: new ObjectId(examId),
//       published: true,
//     });

//     if (!exam) {
//       return Response.json({ message: "Exam not found" }, { status: 404 });
//     }

//     // ⏱ Check exam timing
//     const now = new Date();
//     if (now < new Date(exam.startTime) || now > new Date(exam.endTime)) {
//       return Response.json({ message: "Exam not active" }, { status: 403 });
//     }

//     // 🔐 Check student batch
//     const batch = await batchesCol.findOne({
//       _id: { $in: exam.batchIds },
//       students: session.user.email,
//     });

//     if (!batch) {
//       return Response.json({ message: "Access denied" }, { status: 403 });
//     }

//     // ✅ Fetch MCQ questions (hide correctOption)
//     const mcqQuestions = await questionsCol
//       .find({ examId: exam._id.toString() })
//       .project({ _id: 1, questionText: 1, options: 1, marks: 1 })
//       .toArray();

//     // ✅ Fetch Theory questions
//     const theoryQuestions = await theoryCol
//       .find({ examId: exam._id.toString() })
//       .project({ _id: 1, questionText: 1, marks: 1 })
//       .toArray();

//     // ✅ Combine both
//     const questions = [...mcqQuestions, ...theoryQuestions];

//     return Response.json({
//       exam: {
//         _id: exam._id,
//         title: exam.title,
//         type: exam.type,
//         duration: exam.duration,
//         totalQuestions: exam.totalQuestions,
//       },
//       questions,
//     });
//   } catch (err) {
//     console.error("Student exam fetch error:", err);
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }

//try shuffle

//src/app/api/student/exam/[examId]/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ✅ Shuffle helper (Fisher–Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function GET(req, context) {
  try {
    // ✅ Get current session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Next.js 16: unwrap params
    const params = await context.params;
    const examId = params.examId;

    if (!ObjectId.isValid(examId)) {
      return Response.json({ message: "Invalid exam ID" }, { status: 400 });
    }

    // Collections
    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions"); // MCQs
    const theoryCol = await getCollection("theoryQuestions"); // Theory questions
    const batchesCol = await getCollection("batches");

    // Find exam
    const exam = await examsCol.findOne({
      _id: new ObjectId(examId),
      published: true,
    });

    if (!exam) {
      return Response.json({ message: "Exam not found" }, { status: 404 });
    }

    // ⏱ Check exam timing
    const now = new Date();
    if (now < new Date(exam.startTime) || now > new Date(exam.endTime)) {
      return Response.json({ message: "Exam not active" }, { status: 403 });
    }

    // 🔐 Check student batch
    const batch = await batchesCol.findOne({
      _id: { $in: exam.batchIds },
      students: session.user.email,
    });

    if (!batch) {
      return Response.json({ message: "Access denied" }, { status: 403 });
    }

    // ✅ Fetch MCQ questions (hide correctOption)
    const mcqQuestions = await questionsCol
      .find({ examId: exam._id.toString() })
      .project({ _id: 1, questionText: 1, options: 1, marks: 1 })
      .toArray();

    // ✅ Fetch Theory questions
    const theoryQuestions = await theoryCol
      .find({ examId: exam._id.toString() })
      .project({ _id: 1, questionText: 1, marks: 1 })
      .toArray();

    // ✅ Combine both
    let questions = [...mcqQuestions, ...theoryQuestions];

    // ✅ Shuffle questions so each student gets a different order
    questions = shuffleArray(questions);

    return Response.json({
      exam: {
        _id: exam._id,
        title: exam.title,
        type: exam.type,
        duration: exam.duration,
        totalQuestions: exam.totalQuestions,
      },
      questions,
    });
  } catch (err) {
    console.error("Student exam fetch error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
