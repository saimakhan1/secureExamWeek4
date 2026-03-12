//activities API
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const activityCollection = await getCollection("activity_logs");

    const activities = await activityCollection
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      success: true,
      activities,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 },
    );
  }
}
