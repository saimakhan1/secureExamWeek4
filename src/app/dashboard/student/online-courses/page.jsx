"use client";

import Link from "next/link";

export default function OnlineCoursesPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Learning Hub</h1>
          <p className="text-gray-500 text-lg">
            Select a category below to explore our resources.
          </p>
        </div>
      </div>

      <div className="mt-8 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Widget 1: Free Learning */}
          <Link 
            href="/dashboard/student/online-courses/free-resources"
            className="bg-white border-2 border-transparent hover:border-blue-300 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">Free Resources</h2>
            <p className="text-gray-500">
              Access carefully curated free learning materials to kickstart your journey.
            </p>
          </Link>

          {/* Widget 2: Premium Resources (Courses) */}
          <Link 
            href="/dashboard/student/online-courses/premium-courses"
            className="bg-white border-2 border-transparent hover:border-purple-300 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
          >
            <div className="bg-purple-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <span className="text-4xl">💎</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">Premium Resources</h2>
            <p className="text-gray-500">
              Unlock advanced courses, premium tutorials, and exclusive interactive content.
            </p>
          </Link>

          {/* Widget 3: Paid Exam */}
          <Link 
            href="/dashboard/student/online-courses/certification-exams"
            className="bg-white border-2 border-transparent hover:border-green-300 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <span className="text-4xl">🎓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">Take an Exam</h2>
            <p className="text-gray-500">
              Ready to test your knowledge and get certified? Browse our paid exams.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}