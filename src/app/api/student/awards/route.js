// //app/api/student/awards/route.js
// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const awardsCol = await getCollection("awards");

//   const awards = await awardsCol
//     .find({ studentEmail: session.user.email })
//     .sort({ createdAt: -1 })
//     .toArray();

//   const totalGems = awards.reduce((sum, a) => sum + a.gems, 0);

//   return NextResponse.json({
//     awards,
//     totalGems,
//     studentName: session.user.name,
//   });
// }

//award page try

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const awardsCol = await getCollection("awards");

  const awards = await awardsCol
    .find({ studentEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  const totalGems = awards.reduce((sum, a) => sum + a.gems, 0);

  return NextResponse.json({
    awards,
    totalGems,
    studentName: session.user.name,
  });
}
