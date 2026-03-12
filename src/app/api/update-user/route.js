import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import bcrypt from "bcrypt"; // for password hashing

export async function PATCH(req) {
  try {
    // 1️⃣ Get current session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2️⃣ Get request body
    const { image, name, currentPassword, newPassword } = await req.json();

    // 3️⃣ Build update object dynamically
    const updateFields = {};

    if (image) updateFields.image = image;
    if (name) updateFields.name = name;

    const usersCollection = await getCollection("users");

    // --- Handle password change ---
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password required" },
          { status: 400 },
        );
      }

      // Get user from DB
      const user = await usersCollection.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Compare current password
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 },
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.password = hashedPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    // 4️⃣ Update user in MongoDB
    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: updateFields },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
