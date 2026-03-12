// app/api/instructor/analytics/[examId]/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    // Parse examId directly from URL
    const url = new URL(req.url);
    const paths = url.pathname.split("/"); // ['', 'api', 'instructor', 'analytics', 'examId']
    const examId = paths[paths.length - 1];

    if (!examId) {
      return NextResponse.json(
        { message: "Exam ID required" },
        { status: 400 },
      );
    }

    const submissionsCol = await getCollection("submissions");
    const examsCol = await getCollection("exams");

    // Submissions are stored as string examId
    const submissions = await submissionsCol.find({ examId }).toArray();

    let exam = {};
    try {
      exam = (await examsCol.findOne({ _id: new ObjectId(examId) })) || {};
    } catch {
      exam = {};
    }

    if (!submissions.length) {
      return NextResponse.json({
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passCount: 0,
        failCount: 0,
        questionAccuracy: [],
      });
    }

    // Calculate scores
    const scores = submissions.map((s) => s.score || 0);
    const averageScore = (
      scores.reduce((a, b) => a + b, 0) / scores.length
    ).toFixed(2);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const passCount = submissions.filter((s) => s.passed).length;
    const failCount = submissions.length - passCount;

    // Calculate question-wise accuracy
    const questionAccuracy = (exam.questions || []).map((q) => {
      let correct = 0;

      submissions.forEach((s) => {
        // Use question _id as key to access answers object
        if (s.answers && s.answers[q._id] === q.correctOption) correct++;
      });

      return {
        question: q.questionText || q.title || `Question`,
        accuracy: submissions.length
          ? ((correct / submissions.length) * 100).toFixed(2)
          : "0.00",
      };
    });

    return NextResponse.json({
      averageScore,
      highestScore,
      lowestScore,
      passCount,
      failCount,
      questionAccuracy,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json(
      { message: "Failed to fetch analytics", error: err.message },
      { status: 500 },
    );
  }
}
