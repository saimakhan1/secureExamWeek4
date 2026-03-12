import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

/* ====================== GET SUBMISSIONS ====================== */
export async function GET(req, context) {
  try {
    // Unwrap params for Next.js 16+
    const params = await context.params;
    const { examId } = params;

    if (!examId || typeof examId !== "string") {
      return NextResponse.json(
        { message: "Exam ID required" },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const submissionsCol = await getCollection("submissions");
    const theoryQuestionsCol = await getCollection("theoryQuestions");

    // Fetch submissions and theory questions
    const submissions = await submissionsCol
      .find({ examId: String(examId) })
      .toArray();
    const questions = await theoryQuestionsCol
      .find({ examId: String(examId) })
      .toArray();

    // Map questions by string _id
    const qMap = {};
    let totalExamMarks = 0;
    questions.forEach((q) => {
      qMap[q._id.toString()] = q;
      totalExamMarks += q.marks || 0;
    });

    const submissionsWithDetails = submissions.map((sub) => {
      const answersWithMarks = {};

      for (let qid in sub.answers) {
        const question = qMap[qid];
        answersWithMarks[qid] = {
          questionText: question?.questionText || "Question not found",
          answer: sub.answers[qid],
          maxMarks: question?.marks || 0,
          awarded: sub.scores?.[qid] ?? null,
        };
      }

      const awardedTotal = Object.values(sub.scores || {}).reduce(
        (sum, val) => sum + (val || 0),
        0,
      );

      return {
        ...sub,
        answersWithMarks,
        totalMarks: totalExamMarks,
        score: awardedTotal,
      };
    });

    return NextResponse.json({ submissions: submissionsWithDetails });
  } catch (err) {
    console.error("GET Theory Submissions Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ====================== POST: GRADE QUESTION ====================== */
export async function POST(req, context) {
  try {
    const params = await context.params;
    const { examId } = params;

    if (!examId) {
      return NextResponse.json(
        { message: "Exam ID required" },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { submissionId, qid, score } = body;

    if (!submissionId || !qid || score == null) {
      return NextResponse.json(
        { message: "submissionId, qid, score required" },
        { status: 400 },
      );
    }

    const submissionsCol = await getCollection("submissions");
    const theoryQuestionsCol = await getCollection("theoryQuestions");

    // validate question
    const question = await theoryQuestionsCol.findOne({
      _id: new ObjectId(qid),
    });
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }

    if (score > question.marks) {
      return NextResponse.json(
        { message: `Cannot assign more than ${question.marks} marks` },
        { status: 400 },
      );
    }

    // update per-question score
    await submissionsCol.updateOne(
      { _id: new ObjectId(submissionId) },
      { $set: { [`scores.${qid}`]: score } },
    );

    // ✅ Recalculate total score and update submission status
    const submission = await submissionsCol.findOne({
      _id: new ObjectId(submissionId),
    });
    const totalScore = Object.values(submission.scores || {}).reduce(
      (sum, val) => sum + (val || 0),
      0,
    );

    await submissionsCol.updateOne(
      { _id: new ObjectId(submissionId) },
      {
        $set: {
          score: totalScore,
          status: "graded",
          gradedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ message: "Graded successfully" });
  } catch (err) {
    console.error("POST Grade Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
