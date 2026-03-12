import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// 🏆 Gem calculation
function calculateGems(percentage) {
  if (percentage === 100) return 3;
  if (percentage >= 90) return 2;
  if (percentage >= 80) return 1;
  return 0;
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { submissionId, score } = await req.json();

    if (!submissionId || score === undefined) {
      return Response.json(
        { message: "Submission ID and score required" },
        { status: 400 },
      );
    }

    // ✅ Convert score safely
    const numericScore = Number(score);

    if (numericScore < 0) {
      return Response.json(
        { message: "Score cannot be negative" },
        { status: 400 },
      );
    }

    const submissionsCol = await getCollection("submissions");
    const examsCol = await getCollection("exams");
    const awardsCol = await getCollection("awards");
    const messagesCol = await getCollection("messages");

    const submission = await submissionsCol.findOne({
      _id: new ObjectId(submissionId),
    });

    if (!submission) {
      return Response.json(
        { message: "Submission not found" },
        { status: 404 },
      );
    }

    if (submission.status === "graded") {
      return Response.json({ message: "Already graded" }, { status: 409 });
    }

    // ✅ Update submission
    await submissionsCol.updateOne(
      { _id: submission._id },
      {
        $set: {
          score: numericScore,
          status: "graded",
          gradedAt: new Date(),
        },
      },
    );

    // 🔎 Get exam to determine total marks
    let totalMarks = submission.totalMarks || 0;

    if (!totalMarks || totalMarks === 0) {
      const exam = await examsCol.findOne({
        _id: new ObjectId(submission.examId),
      });

      if (exam && exam.totalMarks) {
        totalMarks = exam.totalMarks;
      }
    }

    // ⭐ GEM CALCULATION
    if (totalMarks > 0) {
      const percentage = Math.round((numericScore / totalMarks) * 100);
      const gems = calculateGems(percentage);

      if (gems > 0) {
        // Save award
        await awardsCol.insertOne({
          studentEmail: submission.studentEmail,
          examId: submission.examId,
          examTitle: submission.examTitle,
          examDate: null,
          submissionTime: new Date(),
          percentage,
          gems,
          createdAt: new Date(),
        });

        // Send notification
        await messagesCol.insertOne({
          senderId: "system",
          to: submission.studentEmail,
          message: `🎉 You have received ${gems} gem(s) for achieving ${percentage}% in "${submission.examTitle}" exam.`,
          type: "exam",
          read: false,
          createdAt: new Date(),
        });
      }
    }

    return Response.json({
      message: "Submission graded successfully",
    });
  } catch (err) {
    console.error("Grade theory error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
