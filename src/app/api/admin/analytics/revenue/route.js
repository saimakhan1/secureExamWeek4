// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET() {
//   try {
//     const paymentsCollection = await getCollection("payments");

//     // Last 7 days
//     const labels = [];
//     const values = [];

//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);

//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);

//       const dayPayments = await paymentsCollection
//         .find({
//           status: "completed",
//           createdAt: { $gte: date, $lt: nextDate },
//         })
//         .toArray();

//       const dayRevenue = dayPayments.reduce(
//         (sum, p) => sum + (p.amount / 100 || 0),
//         0,
//       );

//       labels.push(
//         date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//       );
//       values.push(dayRevenue);
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         labels,
//         values,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch revenue" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    // Get period from URL
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week";

    console.log(`Revenue API called with period: ${period}`);

    const paymentsCollection = await getCollection("payments");

    // Determine number of days based on period
    const days = period === "week" ? 7 : 30;

    const labels = [];
    const values = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      // Get payments for this day
      const dayPayments = await paymentsCollection
        .find({
          status: "completed",
          createdAt: { $gte: date, $lt: nextDate },
        })
        .toArray();

      const dayRevenue = dayPayments.reduce(
        (sum, p) => sum + (p.amount / 100 || 0),
        0,
      );

      labels.push(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      values.push(Number(dayRevenue.toFixed(2)));
    }

    console.log(`Returning ${days} days of data`);

    return NextResponse.json({
      success: true,
      data: { labels, values },
    });
  } catch (error) {
    console.error("Revenue API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue" },
      { status: 500 },
    );
  }
}
