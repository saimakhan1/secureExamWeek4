import nodemailer from "nodemailer";

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"SecureExam" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="text-align: center; padding: 20px;">
          <h2 style="color: #0D7C66;">SecureExam</h2>
          <p>Your OTP is: <strong style="font-size: 24px;">${otp}</strong></p>
          <p>Valid for 10 minutes</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false };
  }
}
