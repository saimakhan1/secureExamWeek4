import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await getCollection("users");

    // সব users নিয়ে আসি
    const allUsers = await usersCollection.find({}).toArray();

    // Role অনুযায়ী count বের করি
    const counts = {
      total: allUsers.length,
      admin: allUsers.filter((u) => u.role === "admin").length,
      instructor: allUsers.filter((u) => u.role === "instructor").length,
      student: allUsers.filter((u) => u.role === "student").length,
    };

    return NextResponse.json({ success: true, counts });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 },
    );
  }
}
