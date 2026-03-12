"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaTasks,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";
import AdminDashboard from "./admin/page";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen  bg-primary pt-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-teal-800">
          SecureExam Dashboard
        </h1>

        {/* Welcome Card */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-200 transform transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4 text-teal-700">
              {session.user.role.charAt(0).toUpperCase() +
                session.user.role.slice(1)}{" "}
              Dashboard
            </h2>
            <p className="text-lg mb-2">
              Welcome,{" "}
              <span className="font-semibold">{session.user.name}</span>!
            </p>
            <p className="text-md text-gray-600">
              <span className="font-bold">Role:</span>{" "}
              <span className="font-medium text-teal-700">
                {session.user.role}
              </span>
            </p>
          </div>
        </div>

        {/* admin panel */}
        {session?.user?.role === "admin" && <AdminDashboard></AdminDashboard>}
        {/* Instructor Panel */}
        {session?.user?.role === "instructor" && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card
              href="/dashboard/instructor/create-batch"
              title="Create Batch"
              icon={<FaChalkboardTeacher />}
            />
            <Card
              href="/dashboard/instructor/add-students"
              title="Add Students"
              icon={<FaUserGraduate />}
            />
            <Card
              href="/dashboard/instructor/create-exam"
              title="Create Exam"
              icon={<FaFileAlt />}
            />
            <Card
              href="/dashboard/instructor/question-bank"
              title="Question Bank"
              icon={<FaBookOpen />}
            />
            <Card
              href="/dashboard/instructor/exam-list"
              title="Publish Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/instructor/analytics"
              title="Analytics"
              icon={<FaChartLine />}
            />
          </section>
        )}

        {/* Student Panel */}
        {session?.user?.role === "student" && (
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <Card
              href="/dashboard/student/my-exams"
              title="Available Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/student/result"
              title="View Results"
              icon={<FaFileAlt />}
            />
          </section>
        )}
      </div>
    </main>
  );
}

/* ====================== Reusable Card Component ====================== */
function Card({ href, title, icon }) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-lg border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3 mb-4 text-teal-700 text-2xl">
        {icon} <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">
        Click to manage <span className="font-medium">{title}</span>.
      </p>
    </Link>
  );
}
