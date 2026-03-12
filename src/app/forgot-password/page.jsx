"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });

      if (res.data.success) {
        toast.success("OTP sent! Check your email");
        sessionStorage.setItem("resetEmail", email);
        setTimeout(() => router.push("/verify-otp"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-gray-500 hover:text-[#0D7C66] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6">
          Forgot Password?
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#41B3A2] bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0D7C66] text-white rounded-xl hover:bg-[#41B3A2] transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
