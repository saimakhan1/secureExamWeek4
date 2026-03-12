import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

/* ================= LIST NOTIFICATIONS ================= */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ notifications: [] }, { status: 401 });
  }

  const notificationsCol = await getCollection("notifications");

  const notifications = await notificationsCol
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ notifications });
}

/* ================= MARK AS READ ================= */
export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  const { notificationId } = await req.json();

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const notificationsCol = await getCollection("notifications");

  await notificationsCol.updateOne(
    { _id: new ObjectId(notificationId), userEmail: session.user.email },
    { $set: { read: true } },
  );

  return NextResponse.json({ message: "Notification marked as read" });
}
