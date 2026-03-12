import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { batchId, studentEmails } = await req.json();
    if (!batchId || !studentEmails?.length) {
      return NextResponse.json(
        { message: "batchId and studentEmails required" },
        { status: 400 },
      );
    }

    const emails = [...new Set(studentEmails.map((e) => e.trim()))];
    const batchesCollection = await getCollection("batches");
    const usersCollection = await getCollection("users");
    const messagesCollection = await getCollection("messages");

    // Find batch owned by instructor
    const batch = await batchesCollection.findOne({
      _id: new ObjectId(batchId),
      instructorEmail: session.user.email,
    });
    if (!batch) {
      return NextResponse.json(
        { message: "Batch not found or unauthorized" },
        { status: 404 },
      );
    }

    const students = await usersCollection
      .find({ email: { $in: emails } })
      .toArray();
    const foundEmails = students.map((s) => s.email);
    if (!foundEmails.length)
      return NextResponse.json(
        { message: "No valid students" },
        { status: 404 },
      );

    await batchesCollection.updateOne(
      { _id: new ObjectId(batchId) },
      { $addToSet: { students: { $each: foundEmails } } },
    );

    // Send notifications
    const notifications = foundEmails.map((email) => ({
      to: email,
      message: `bat have been added to batch: ${batch.name}`,
      type: "batch",
      read: false,
      createdAt: new Date(),
    }));
    if (notifications.length)
      await messagesCollection.insertMany(notifications);

    return NextResponse.json({
      message: "Students added & notified",
      addedStudents: foundEmails,
    });
  } catch (error) {
    console.error("POST add-students error:", error);
    return NextResponse.json(
      { message: "Failed to add students" },
      { status: 500 },
    );
  }
}
