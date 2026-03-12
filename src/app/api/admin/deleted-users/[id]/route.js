//Restore & Permanent Delete API
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// Restore deleted user
export async function POST(request, { params }) {
  try {
    const { id } = await params;

    console.log("Restore request for deleted user ID:", id);

    const deletedUsersCollection = await getCollection("deleted_users");
    const usersCollection = await getCollection("users");

    // Find deleted user
    let deletedUser = await deletedUsersCollection.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
    });

    if (!deletedUser) {
      return NextResponse.json(
        { error: "Deleted user not found" },
        { status: 404 },
      );
    }

    console.log("Found deleted user:", deletedUser.name);

    // Prepare user for restoration
    const {
      _id,
      deletedAt,
      deletedBy,
      restoreAvailable,
      originalId,
      ...userToRestore
    } = deletedUser;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      email: userToRestore.email,
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    // Restore to users collection
    const restoreResult = await usersCollection.insertOne({
      ...userToRestore,
      restoredAt: new Date(),
      isActive: true,
    });

    console.log("User restored with new ID:", restoreResult.insertedId);

    // Remove from deleted collection
    await deletedUsersCollection.deleteOne({ _id: deletedUser._id });

    return NextResponse.json({
      success: true,
      message: "User restored successfully",
    });
  } catch (error) {
    console.error("Restore Error:", error);
    return NextResponse.json(
      { error: "Failed to restore user: " + error.message },
      { status: 500 },
    );
  }
}

// Permanent delete
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    console.log("Permanent delete request for ID:", id);

    const deletedUsersCollection = await getCollection("deleted_users");

    // Find and permanently delete
    const result = await deletedUsersCollection.deleteOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Deleted user not found" },
        { status: 404 },
      );
    }

    console.log("User permanently deleted");
    return NextResponse.json({
      success: true,
      message: "User permanently deleted",
    });
  } catch (error) {
    console.error("Permanent Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to permanently delete user: " + error.message },
      { status: 500 },
    );
  }
}
