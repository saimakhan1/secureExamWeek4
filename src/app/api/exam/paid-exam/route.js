import { getCollection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getCollection("exams");
    
    // Fetch all published exams
    const exams = await db
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();

    if (!exams) {
      return NextResponse.json(
        { exams: [] },
        { status: 200 }
      );
    }

    // Format exams data
    const formattedExams = exams.map(exam => ({
      _id: exam._id.toString(),
      title: exam.title,
      description: exam.description || "Certification Exam",
      price: exam.price || 4900, // Default to $49.00 if not set
      duration: exam.duration,
      type: exam.type,
      totalQuestions: exam.totalQuestions || exam.questionsCount || 0,
      totalMarks: exam.totalMarks || 0
    }));

    return NextResponse.json(
      { exams: formattedExams },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }
}
