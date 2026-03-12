import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    console.log("Activities by type API called");

    const activityCollection = await getCollection("activity_logs");

    // Today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's activities
    const todayActivities = await activityCollection
      .find({
        timestamp: { $gte: today, $lt: tomorrow },
      })
      .sort({ timestamp: -1 })
      .toArray();

    console.log(`Found ${todayActivities.length} activities today`);

    // Separate activities by type
    const registrations = todayActivities.filter(
      (a) => a.action === "joined_platform",
    );
    const logins = todayActivities.filter((a) => a.action === "logged_in");
    const purchases = todayActivities.filter(
      (a) => a.action === "purchased_course",
    );

    // Get payment details for purchases
    const paymentsCollection = await getCollection("payments");
    const purchasesWithDetails = await Promise.all(
      purchases.map(async (purchase) => {
        const payment = await paymentsCollection.findOne({
          userId: purchase.userId,
          createdAt: { $gte: today, $lt: tomorrow },
        });

        return {
          ...purchase,
          amount: payment?.amount ? payment.amount / 100 : null,
          courseName: payment?.courseName || purchase.details,
        };
      }),
    );

    return NextResponse.json({
      success: true,
      data: {
        registrations: registrations.slice(0, 10), // Last 10
        logins: logins.slice(0, 10), // Last 10
        purchases: purchasesWithDetails.slice(0, 10), // Last 10
        counts: {
          total: todayActivities.length,
          registrations: registrations.length,
          logins: logins.length,
          purchases: purchases.length,
        },
      },
    });
  } catch (error) {
    console.error("Activities by type API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 },
    );
  }
}
