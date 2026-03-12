import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect"; // পাথটি আপনার ফোল্ডার অনুযায়ী ঠিক করে নিবেন

export async function POST(request) {
  try {
    //frontend data factch 
    const body = await request.json();
    const { name, role, email, subject, message } = body;

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required" },
        { status: 400 }
      );
    }

    // database collection add
    const contactsCollection = await getCollection("contacts");

    // data base insert
    const result = await contactsCollection.insertOne({
      name,
      role,
      email,
      subject,
      message,
      createdAt: new Date(), 
    });

    // success response
    return NextResponse.json(
      { message: "Message sent successfully!", success: true, result },
      { status: 201 }
    );

  } catch (error) {
    console.error("Database Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}