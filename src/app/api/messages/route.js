import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/* ================= GET MESSAGES ================= */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json([], { status: 401 });

    const messagesCol = await getCollection("messages");
    const messages = await messagesCol
      .find({ to: session.user.email }) // only messages for this student
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(Array.isArray(messages) ? messages : []);
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

/* ================= POST MESSAGE ================= */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const messagesCol = await getCollection("messages");

    // recipients can be single or multiple
    const recipients = Array.isArray(data.to) ? data.to : [data.to];

    const messages = recipients.map((email) => ({
      senderId: session.user.email,
      to: email,
      message: data.message,
      type: data.type || "info", // exam, batch, general
      read: false,
      createdAt: new Date(),
    }));

    await messagesCol.insertMany(messages);

    return NextResponse.json({ message: "Message(s) sent" });
  } catch (error) {
    console.error("POST messages error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 },
    );
  }
}
