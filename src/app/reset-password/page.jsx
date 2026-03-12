"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const e = sessionStorage.getItem("resetEmail");
    const o = sessionStorage.getItem("resetOTP");
    if (!e || !o) router.push("/forgot-password");
    else {
      setEmail(e);
      setOtp(o);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be 6+ characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });

      if (res.data.success) {
        toast.success("Password reset!");
        sessionStorage.clear();
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <Link
          href="/verify-otp"
          className="inline-flex items-center text-gray-500 hover:text-[#0D7C66] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:border-[#41B3A2]"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {show ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:border-[#41B3A2]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0D7C66] text-white rounded-xl hover:bg-[#41B3A2] transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
