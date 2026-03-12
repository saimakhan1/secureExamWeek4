//for single user's api
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

//GET
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const usersCollection = await getCollection("users");

    // Try to find by string ID first
    let user = await usersCollection.findOne({ _id: id });

    // If not found, try as ObjectId
    if (!user && ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error(" Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

//PUT
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updates = await request.json();

    const usersCollection = await getCollection("users");

    const { _id, password, createdAt, ...validUpdates } = updates;
    validUpdates.updatedAt = new Date();

    // Try string ID first, then ObjectId
    let result = await usersCollection.updateOne(
      { _id: id },
      { $set: validUpdates },
    );

    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
      result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: validUpdates },
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

//DELETE
// export async function DELETE(request, { params }) {
//   try {
//     const { id } = await params;

//     const usersCollection = await getCollection("users");
//     console.log(" Database connected");

//     // Try string ID first
//     console.log(" Trying string ID delete...");
//     let result = await usersCollection.deleteOne({ _id: id });
//     console.log(" String ID result:", result);

//     // If not found, try as ObjectId
//     if (result.deletedCount === 0 && ObjectId.isValid(id)) {
//       console.log(" Trying ObjectId delete:", new ObjectId(id));
//       result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
//       console.log(" ObjectId result:", result);
//     }

//     if (result.deletedCount === 0) {
//       console.log("User not found with any method");
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("✅ User deleted successfully");
//     return NextResponse.json({ success: true, message: "User deleted" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete user: " + error.message },
//       { status: 500 },
//     );
//   }
// }

//DELETE - Archive user to deleted_users collection
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    console.log("DELETE request for ID:", id);

    const usersCollection = await getCollection("users");
    const deletedUsersCollection = await getCollection("deleted_users");
    console.log("Database connected");

    // Find user first
    let user = await usersCollection.findOne({ _id: id });

    if (!user && ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user.name);

    // Remove password from user data for archive
    const { password, ...userWithoutPassword } = user;

    // Add to deleted_users collection with deletion info
    const deletedUser = {
      ...userWithoutPassword,
      originalId: user._id,
      deletedAt: new Date(),
      deletedBy: "admin", // You can get from session if needed
      restoreAvailable: true,
    };

    // Remove _id so MongoDB generates new one
    delete deletedUser._id;

    const archiveResult = await deletedUsersCollection.insertOne(deletedUser);
    console.log("User archived with ID:", archiveResult.insertedId);

    // Try string ID first for deletion
    console.log("Trying string ID delete...");
    let deleteResult = await usersCollection.deleteOne({ _id: id });
    console.log("String ID result:", deleteResult);

    // If not found, try as ObjectId
    if (deleteResult.deletedCount === 0 && ObjectId.isValid(id)) {
      console.log("Trying ObjectId delete:", new ObjectId(id));
      deleteResult = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      console.log("ObjectId result:", deleteResult);
    }

    console.log("User archived and deleted successfully");
    return NextResponse.json({
      success: true,
      message: "User deleted and archived successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user: " + error.message },
      { status: 500 },
    );
  }
}
