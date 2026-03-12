"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (!savedEmail) {
      toast.error("Please start from forgot password");
      router.push("/forgot-password");
    } else {
      setEmail(savedEmail);
    }
  }, [router]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp: otpString,
      });

      if (response.data.success) {
        toast.success("OTP verified!");
        sessionStorage.setItem("resetOTP", otpString);
        setTimeout(() => router.push("/reset-password"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("New OTP sent!");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <Link
          href="/forgot-password"
          className="inline-flex items-center text-gray-500 hover:text-[#0D7C66] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h1>
          <p className="text-gray-500 text-sm">
            Enter the 6-digit code sent to <br />
            <span className="text-[#0D7C66] font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#41B3A2] bg-gray-50"
                disabled={loading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition mb-4 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D7C66] hover:bg-[#41B3A2]"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full text-sm text-[#0D7C66] hover:text-[#41B3A2] transition-colors"
          >
            Did not receive code? Resend
          </button>
        </form>
      </div>
    </div>
  );
}
