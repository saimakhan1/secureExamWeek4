import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { generateOTP, sendOTPEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get users collection
    const usersCollection = await getCollection("users");

    // Find user
    const user = await usersCollection.findOne({ email });

    if (!user) {
      // Security: Don't reveal if user exists
      return NextResponse.json({
        success: true,
        message: "If account exists, OTP will be sent",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to user document
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          resetPasswordOTP: otp,
          resetPasswordExpires: expires,
        },
      },
    );

    // Send email
    await sendOTPEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
