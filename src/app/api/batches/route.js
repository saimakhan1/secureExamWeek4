// File: app/api/batches/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json([], { status: 401 });
    }

    const batchesCollection = await getCollection("batches");
    const batches = await batchesCollection
      .find({ instructorEmail: session.user.email })
      .toArray();

    return NextResponse.json(batches || []);
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { message: "Batch name required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");
    const existingBatch = await batchesCollection.findOne({
      name: name.trim(),
      instructorEmail: session.user.email,
    });

    if (existingBatch) {
      return NextResponse.json(
        { message: "Batch already exists" },
        { status: 400 },
      );
    }

    const newBatch = {
      name: name.trim(),
      students: [],
      instructorEmail: session.user.email,
      createdAt: new Date(),
    };

    const result = await batchesCollection.insertOne(newBatch);
    return NextResponse.json({
      message: "Batch created",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("POST batch error:", error);
    return NextResponse.json(
      { message: "Failed to create batch" },
      { status: 500 },
    );
  }
}
