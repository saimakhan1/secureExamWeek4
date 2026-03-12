"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcGoogle } from "react-icons/fc";
import { IoShield } from "react-icons/io5";

// Lottie dynamic import for client-side rendering only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import learningAnimation from "@/assets/learning.json"; // Instructor
import studentAnimation from "@/assets/Student.json"; // Student
import educationAnimation from "@/assets/Educatin.json"; // Admin
export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto-login after registration
        await signIn("credentials", { email, password, redirect: false });

        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (sessionData?.user?.role) {
          window.location.href = "/dashboard";
        }
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // animation mapping based on role selection
  const getAnimationForRole = {
    admin: educationAnimation,
    instructor: learningAnimation,
    student: studentAnimation,
  };

  // input styles for consistency
  const inputStyles =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0D7C66] focus:ring-2 focus:ring-[#0D7C66]/20 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-400";

  return (
    <div className="min-h-screen flex items-center justify-center mt-20 bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        {/* Left Side: Lottie Animation (Hidden on Mobile) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#0D7C66]/5 flex-col justify-center items-center p-12 relative overflow-hidden transition-colors duration-500">
          <div className="z-10 flex flex-col items-center">
            {/* Lottie Animation Rendering */}
            <Lottie
              animationData={getAnimationForRole[role]}
              loop={true}
              className="w-[80%] max-w-md transition-all duration-500"
            />
            <h2 className="mt-8 text-3xl font-bold text-[#0D7C66] text-center capitalize">
              Join as {role}
            </h2>
            <p className="mt-4 text-gray-600 text-center max-w-sm">
              Empower your educational journey with our secure and reliable
              online examination platform.
            </p>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#0D7C66]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#41B3A2]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-14">
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66] mb-3">
              <IoShield size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              Create an account
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Please fill in your details to get started.
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-2 mb-8 bg-gray-50 p-1.5 rounded-2xl">
            {["admin", "instructor", "student"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  role === item
                    ? "bg-white text-[#0D7C66] shadow-sm border border-gray-100"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item === "admin" && "👑 Admin"}
                {item === "instructor" && "📚 Instructor"}
                {item === "student" && "🎓 Student"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                required
                className={inputStyles}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                className={inputStyles}
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyles}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputStyles}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputStyles}
              />
            </div>

            <div className="flex items-center gap-2 text-sm pt-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 border-gray-300 rounded text-[#0D7C66] focus:ring-[#0D7C66] cursor-pointer"
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#0D7C66] hover:underline font-medium"
                >
                  Terms & Conditions
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 rounded-xl bg-[#0D7C66] text-white font-bold text-lg hover:bg-[#0b6654] hover:shadow-lg hover:shadow-[#0D7C66]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-gray-700 font-semibold"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#0D7C66] hover:underline font-bold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
