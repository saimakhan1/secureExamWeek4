import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    /* =====================================
       🔐 AUTH CHECK
    ===================================== */
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* =====================================
       📦 BODY VALIDATION
    ===================================== */
    const { examId } = await req.json();

    if (!examId || !ObjectId.isValid(examId)) {
      return NextResponse.json({ message: "Invalid exam ID" }, { status: 400 });
    }

    /* =====================================
       📚 COLLECTIONS
    ===================================== */
    const examsCol = await getCollection("exams");
    const batchesCol = await getCollection("batches");
    const notificationsCol = await getCollection("messages");

    /* =====================================
       🧪 EXAM OWNERSHIP CHECK
    ===================================== */
    const exam = await examsCol.findOne({
      _id: new ObjectId(examId),
      instructorEmail: session.user.email,
    });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    if (exam.published) {
      return NextResponse.json({ message: "Exam already published" });
    }

    /* =====================================
       ✅ PUBLISH EXAM
    ===================================== */
    await examsCol.updateOne(
      { _id: exam._id },
      {
        $set: {
          published: true,
          status: "published",
          updatedAt: new Date(),
        },
      },
    );

    /* =====================================
       👥 FIND BATCH STUDENTS
    ===================================== */
    const batchObjectIds = (exam.batchIds || [])
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const batches = await batchesCol
      .find({
        _id: { $in: batchObjectIds },
        instructorEmail: session.user.email,
      })
      .toArray();

    // Extract unique student emails
    const studentEmails = [
      ...new Set(batches.flatMap((batch) => batch.students || [])),
    ];

    /* =====================================
       🔔 CREATE NOTIFICATIONS
       - Publish notification
       - Upcoming exam notifications (2 days & 1 day)
    ===================================== */
    const notifications = [];

    if (studentEmails.length > 0) {
      // Original "exam published" notification
      notifications.push(
        ...studentEmails.map((email) => ({
          to: email,
          type: "exam_published",
          examId: exam._id.toString(),
          title: "New Exam Published",
          message: `A new exam "${exam.title}" has been published.`,
          read: false,
          createdAt: new Date(),
        })),
      );

      // Upcoming exam notifications
      const examDate = new Date(exam.startTime);

      studentEmails.forEach((email) => {
        const now = new Date();

        // Compare calendar dates
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );
        const startDay = new Date(
          examDate.getFullYear(),
          examDate.getMonth(),
          examDate.getDate(),
        );

        const diffDays = Math.floor((startDay - today) / (1000 * 60 * 60 * 24));

        if (diffDays === 2) {
          notifications.push({
            to: email,
            type: "exam_upcoming",
            examId: exam._id.toString(),
            title: "Exam in 2 Days",
            message: `You have "${exam.title}" exam in 2 days.`,
            read: false,
            createdAt: new Date(),
          });
        } else if (diffDays === 1) {
          notifications.push({
            to: email,
            type: "exam_upcoming",
            examId: exam._id.toString(),
            title: "Exam Tomorrow",
            message: `You have "${exam.title}" exam tomorrow.`,
            read: false,
            createdAt: new Date(),
          });
        } else if (diffDays === 0) {
          notifications.push({
            to: email,
            type: "exam_upcoming",
            examId: exam._id.toString(),
            title: "Exam Today",
            message: `You have "${exam.title}" exam today.`,
            read: false,
            createdAt: new Date(),
          });
        }
      });
    }

    if (notifications.length > 0) {
      await notificationsCol.insertMany(notifications);
    }

    /* =====================================
       ✅ RESPONSE
    ===================================== */
    return NextResponse.json({
      message: "Exam published and students notified",
      notifiedStudents: studentEmails.length,
    });
  } catch (error) {
    console.error("PATCH /api/exams/publish error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
