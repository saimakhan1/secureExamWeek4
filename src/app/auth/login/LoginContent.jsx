"use client";

import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcGoogle } from "react-icons/fc";
import { IoShield } from "react-icons/io5";

// Disable SSR for Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import learningAnimation from "@/assets/learning.json";
import studentAnimation from "@/assets/Student.json";
import educationAnimation from "@/assets/Educatin.json";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Safe animation selection
  const animationData = useMemo(() => {
    const animations = {
      admin: educationAnimation,
      instructor: learningAnimation,
      student: studentAnimation,
    };

    return animations[role] || studentAnimation;
  }, [role]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result || result.error) {
        setLoading(false);
        // Check if backend reported locked profile
        if (result?.error?.toLowerCase().includes("profile is locked")) {
          setIsLocked(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password",
            confirmButtonColor: "#0D7C66",
          });
        }
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const dbRole = sessionData?.user?.role;

      if (!dbRole) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "User role not found.",
          confirmButtonColor: "#0D7C66",
        });
        return;
      }

      if (dbRole !== role) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Wrong Role Selected",
          text: `Your account role is "${dbRole}". Please select the correct role.`,
          confirmButtonColor: "#0D7C66",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting...",
        confirmButtonColor: "#0D7C66",
        timer: 1200,
        showConfirmButton: false,
      });

      setTimeout(() => {
        if (callbackUrl) {
          router.push(callbackUrl);
          return;
        }
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#0D7C66",
      });
    }
  };

  // common input styles for email and password fields
  const inputStyles =
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 focus:border-[#0D7C66] transition-all text-gray-700";
  //role base animation mapping for Lottie
  const getAnimationForRole = {
    admin: educationAnimation,
    instructor: learningAnimation,
    student: studentAnimation,
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-20 bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        {/* Left Side: Lottie Animation (Hidden on Mobile) */}

        <div className="hidden md:flex w-full md:w-1/2 bg-[#0D7C66]/5 flex-col justify-center items-center p-12 relative overflow-hidden transition-colors duration-500">
          <div className="z-10 flex flex-col items-center">
            {animationData && (
              <Lottie
                key={role}
                animationData={animationData}
                loop
                className="w-[80%] max-w-md"
              />
            )}

            <h2 className="mt-8 text-3xl font-bold text-[#0D7C66] text-center capitalize">
              Welcome back, {role}
            </h2>

            <p className="mt-4 text-gray-600 text-center max-w-sm">
              Log in to your account to continue your secure and reliable
              educational journey.
            </p>
          </div>

          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#0D7C66]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#41B3A2]/10 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT SIDE FORM */}
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
              Login to your account
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your credentials to access your dashboard.
            </p>
          </div>

          {/* ROLE SELECTOR */}
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

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyles}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputStyles}
              />
            </div>
            <div>
              <Link
                href="/forgot-password"
                className="text-[#0D7C66] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 border-gray-300 rounded text-[#0D7C66] focus:ring-[#0D7C66] cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-[#0D7C66] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 rounded-xl bg-[#0D7C66] text-white font-bold text-lg hover:bg-[#0b6654] hover:shadow-lg hover:shadow-[#0D7C66]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: callbackUrl || "/dashboard/student",
              })
            }
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-gray-700 font-semibold"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              href="/auth/registration"
              className="text-[#0D7C66] hover:underline font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Profile Locked Modal */}
      {isLocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center shadow-2xl">
            <Lottie
              animationData={educationAnimation}
              loop
              className="w-40 h-40"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
              Oh no, profile is locked!
            </h2>
            <p className="mt-2 text-gray-500 text-center">
              For your security, your account has been locked after 3 failed
              login attempts.
            </p>

            <button
              onClick={() => router.push("/forgot-password")}
              className="mt-6 w-full py-3 rounded-xl bg-[#0D7C66] text-white font-semibold hover:bg-[#0b6654] transition-all"
            >
              Retrieve account
            </button>

            <button
              type="button"
              onClick={() => setIsLocked(false)}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
