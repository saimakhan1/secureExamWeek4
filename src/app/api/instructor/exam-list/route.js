// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "instructor") {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const type = req.nextUrl.searchParams.get("type");

//     const examsCol = await getCollection("exams");

//     let filter = {
//       instructorEmail: session.user.email,
//     };

//     if (type) {
//       filter.type = type; // theory or mcq
//     }

//     const exams = await examsCol.find(filter).toArray();

//     return new Response(JSON.stringify({ exams }), { status: 200 });
//   } catch (err) {
//     console.error("Exam list error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

//...................

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const type = req.nextUrl.searchParams.get("type");

    const examsCol = await getCollection("exams");
    const batchesCol = await getCollection("batches");

    // Get all exams of this instructor
    let filter = { instructorEmail: session.user.email };
    if (type) filter.type = type;

    const exams = await examsCol.find(filter).toArray();

    // Get all batches of this instructor
    const batches = await batchesCol
      .find({ instructorEmail: session.user.email })
      .toArray();

    // Map batch IDs to batch names
    const batchMap = {};
    batches.forEach((b) => (batchMap[b._id.toString()] = b.name));

    // Attach batch names to each exam
    const examsWithBatches = exams.map((exam) => {
      let batchNames = [];

      // If exam has batchIds array, map them to names
      if (exam.batchIds && Array.isArray(exam.batchIds)) {
        batchNames = exam.batchIds
          .map((id) => batchMap[id.toString()])
          .filter(Boolean); // Remove undefined
      }

      return { ...exam, batchNames };
    });

    return new Response(JSON.stringify({ exams: examsWithBatches }), {
      status: 200,
    });
  } catch (err) {
    console.error("Exam list error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
