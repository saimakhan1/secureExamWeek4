import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return new Response("Unauthorized", { status: 401 });
    }

    const batchesCol = await getCollection("batches");
    const examsCol = await getCollection("exams");

    // 1️⃣ Find batches where student belongs
    const batches = await batchesCol
      .find({ students: session.user.email })
      .toArray();

    const batchIds = batches.map((b) => b._id);

    if (!batchIds.length) {
      return Response.json({ exams: [] });
    }

    // 2️⃣ Find published exams for those batches
    const exams = await examsCol
      .find({
        published: true,
        batchIds: { $in: batchIds },
      })
      .project({
        title: 1,
        startTime: 1,
        endTime: 1,
        duration: 1,
      })
      .toArray();

    return Response.json({ exams });
  } catch (err) {
    console.error("Student exams error:", err);
    return new Response("Server error", { status: 500 });
  }
}
