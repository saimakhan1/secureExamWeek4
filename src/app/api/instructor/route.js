import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await getCollection("instructors"); // changed from "teachers"
    const instructors = await collection.find({}).toArray();

    return NextResponse.json(instructors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const collection = await getCollection("instructors"); // changed from "teachers"

    const instructor = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subjects: data.subjects || [],
      createdAt: new Date(),
    };

    const result = await collection.insertOne(instructor);

    return NextResponse.json({
      message: "Instructor added",
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add instructor" },
      { status: 500 },
    );
  }
}
