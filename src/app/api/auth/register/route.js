import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect";

import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password, role, phone } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const usersCollection = await getCollection("users");

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      image: "",
      createdAt: new Date(),
      // Track login attempts and lock state
      failedLoginAttempts: 0,
      isLocked: false,
    });

    // Activity Log for new registration
    await logActivity({
      userId: result.insertedId,
      userName: name,
      userEmail: email,
      userRole: role,
      action: "joined_platform",
      details: "New user registration",
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
