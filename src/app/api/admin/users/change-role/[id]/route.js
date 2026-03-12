import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { newRole } = await request.json();

    console.log("🔍 Change role for ID:", id, "to:", newRole);

    // Validate role
    if (!["instructor"].includes(newRole)) {
      return NextResponse.json(
        { error: "Invalid role. Students can only be promoted to Instructor" },
        { status: 400 },
      );
    }

    const usersCollection = await getCollection("users");

    // First get the user to check current role
    let user = await usersCollection.findOne({ _id: id });

    if (!user && ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user is student
    if (user.role !== "student") {
      return NextResponse.json(
        { error: "Only students can be promoted to instructor" },
        { status: 400 },
      );
    }

    // Update role
    let result = await usersCollection.updateOne(
      { _id: id },
      {
        $set: {
          role: newRole,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
      result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            role: newRole,
            updatedAt: new Date(),
          },
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student promoted to Instructor successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
