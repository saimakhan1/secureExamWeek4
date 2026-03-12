// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const batchesCollection = await getCollection("batches");
//     const batches = await batchesCollection
//       .find({
//         $or: [
//           { instructorEmail: session.user.email },
//           { instructorEmail: { $exists: false } },
//         ],
//       })
//       .toArray();

//     return NextResponse.json(batches);
//   } catch (error) {
//     console.error("GET batches error:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch batches" },
//       { status: 500 },
//     );
//   }
// }

//.......
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { batchId, studentEmail } = await req.json();

    if (!batchId || !studentEmail) {
      return NextResponse.json(
        { message: "batchId and studentEmail required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");
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

    // Remove student from batch
    await batchesCollection.updateOne(
      { _id: new ObjectId(batchId) },
      { $pull: { students: studentEmail } },
    );

    // Optional: send notification to student
    await messagesCollection.insertOne({
      to: studentEmail,
      message: `You have been removed from batch: ${batch.name}`,
      type: "batch",
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: `Student ${studentEmail} removed successfully`,
      removedStudent: studentEmail,
    });
  } catch (error) {
    console.error("POST remove-students error:", error);
    return NextResponse.json(
      { message: "Failed to remove student" },
      { status: 500 },
    );
  }
}
