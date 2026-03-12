//Stats API
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    console.log("📡 Stats API called - Fixed Version");

    // Today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Users stats
    let totalUsers = 0,
      students = 0,
      instructors = 0,
      admins = 0,
      newUsersToday = 0;

    try {
      const usersCollection = await getCollection("users");
      totalUsers = (await usersCollection.countDocuments()) || 0;
      students =
        (await usersCollection.countDocuments({ role: "student" })) || 0;
      instructors =
        (await usersCollection.countDocuments({ role: "instructor" })) || 0;
      admins = (await usersCollection.countDocuments({ role: "admin" })) || 0;
      newUsersToday =
        (await usersCollection.countDocuments({
          createdAt: { $gte: today, $lt: tomorrow },
        })) || 0;
    } catch (e) {
      console.log("Users collection error:", e.message);
    }

    // Courses stats
    let totalCourses = 0;
    try {
      const coursesCollection = await getCollection("courses");
      totalCourses = (await coursesCollection.countDocuments()) || 0;
    } catch (e) {
      console.log("Courses collection error:", e.message);
    }

    // Payment stats
    let totalRevenue = 0,
      totalTransactions = 0,
      todayRevenue = 0;

    try {
      const paymentsCollection = await getCollection("payments");
      const allPayments =
        (await paymentsCollection.find({ status: "completed" }).toArray()) ||
        [];

      totalTransactions = allPayments.length;

      allPayments.forEach((p) => {
        totalRevenue += (p.amount || 0) / 100;
      });

      const todayPayments = allPayments.filter((p) => {
        const d = new Date(p.createdAt);
        return d >= today && d < tomorrow;
      });

      todayPayments.forEach((p) => {
        todayRevenue += (p.amount || 0) / 100;
      });
    } catch (e) {
      console.log("Payments collection error:", e.message);
    }

    // ✅ FIXED: Active Today - ব্যবহার করুন find() instead of distinct()
    let activeToday = 0;
    try {
      const activityCollection = await getCollection("activity_logs");

      // সব activities খুঁজে বের করি
      const activities =
        (await activityCollection
          .find({
            timestamp: { $gte: today, $lt: tomorrow },
          })
          .toArray()) || [];

      console.log(`📊 Found ${activities.length} activities today`);

      // unique userId বের করি
      const uniqueUserIds = new Set();
      activities.forEach((act) => {
        if (act.userId) {
          uniqueUserIds.add(act.userId.toString());
        }
      });

      activeToday = uniqueUserIds.size;
      console.log(`👥 Unique active users today: ${activeToday}`);
    } catch (e) {
      console.log("Activity collection error:", e.message);
    }

    const avgTransaction =
      totalTransactions > 0
        ? (totalRevenue / totalTransactions).toFixed(2)
        : "0.00";

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students,
          instructors,
          admins,
          newToday: newUsersToday,
        },
        courses: { total: totalCourses },
        payments: {
          totalRevenue: totalRevenue.toFixed(2),
          totalTransactions,
          todayRevenue: todayRevenue.toFixed(2),
          averageTransaction: avgTransaction,
        },
        activity: { activeToday },
      },
    });
  } catch (error) {
    console.error("❌ Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats", details: error.message },
      { status: 500 },
    );
  }
}
