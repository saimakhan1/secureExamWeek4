import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { examId } = params;

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCol = await getCollection("exams");
    const submissionsCol = await getCollection("submissions");

    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    // SECURITY: only instructor can see analytics
    if (exam.instructorEmail !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const submissions = await submissionsCol.find({ examId: examId }).toArray();

    if (!submissions.length) {
      return NextResponse.json({
        totalStudents: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passCount: 0,
        failCount: 0,
        questionAccuracy: [],
      });
    }

    const scores = submissions.map((s) => s.score || 0);

    const totalStudents = submissions.length;

    const averageScore = scores.reduce((sum, s) => sum + s, 0) / totalStudents;

    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    const passMark = 40;

    const passCount = submissions.filter(
      (s) => ((s.score || 0) / (s.totalMarks || 1)) * 100 >= passMark,
    ).length;

    const failCount = totalStudents - passCount;

    // Question-wise accuracy
    const questionStats = {};

    submissions.forEach((sub) => {
      (sub.answers || []).forEach((ans) => {
        if (!questionStats[ans.questionId]) {
          questionStats[ans.questionId] = {
            attempts: 0,
            correct: 0,
          };
        }

        questionStats[ans.questionId].attempts++;

        if (ans.correct) {
          questionStats[ans.questionId].correct++;
        }
      });
    });

    const questionAccuracy = Object.entries(questionStats).map(
      ([questionId, q]) => ({
        questionId,
        accuracy: Number(((q.correct / q.attempts) * 100).toFixed(1)),
      }),
    );

    return NextResponse.json({
      totalStudents,
      averageScore: Number(averageScore.toFixed(2)),
      highestScore,
      lowestScore,
      passCount,
      failCount,
      questionAccuracy,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json(
      { message: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
