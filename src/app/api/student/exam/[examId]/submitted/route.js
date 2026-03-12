//src/app/api/student/exam/[examId]/submitted/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    // 1️⃣ Get session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return new Response(JSON.stringify({ submitted: false }), {
        status: 401,
      });
    }

    const { examId } = params;

    if (!examId || !ObjectId.isValid(examId)) {
      return new Response(JSON.stringify({ submitted: false }), {
        status: 400,
      });
    }

    // 2️⃣ Get submissions collection
    const submissionsCollection = await getCollection("submissions");

    // 3️⃣ Check if THIS student already submitted THIS exam
    const existingSubmission = await submissionsCollection.findOne({
      examId: new ObjectId(examId),
      studentEmail: session.user.email,
    });

    // 4️⃣ Return clean boolean
    return new Response(
      JSON.stringify({
        submitted: !!existingSubmission,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking exam submission:", error);

    // Fail safely (do NOT block exam UI)
    return new Response(JSON.stringify({ submitted: false }), { status: 500 });
  }
}
