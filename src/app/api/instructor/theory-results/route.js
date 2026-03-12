// src/app/api/instructor/theory-results/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const examId = req.nextUrl.searchParams.get("examId");

    if (!examId) {
      return new Response(JSON.stringify({ message: "Missing examId" }), {
        status: 400,
      });
    }

    const submissionsCol = await getCollection("submissions");

    const results = await submissionsCol
      .find({
        examId,
        status: "graded",
      })
      .toArray();

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (err) {
    console.error("Theory results error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
