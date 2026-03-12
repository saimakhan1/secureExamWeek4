"use client";

import { useEffect, useState } from "react";

export default function MyExamsPage() {
  const [exams, setExams] = useState([]);
  const [submittedExams, setSubmittedExams] = useState(new Set());

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/student/exams");
        const data = await res.json();

        // ✅ Sort exams so latest exam appears first
        const sortedExams = (data.exams || []).sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime),
        );
        setExams(sortedExams);

        // Fetch submitted exams
        const submittedRes = await fetch("/api/student/exams/submitted");
        if (submittedRes.ok) {
          const submittedData = await submittedRes.json();
          setSubmittedExams(new Set(submittedData.examIds || []));
        }
      } catch (err) {
        console.error("Failed to load exams or submissions:", err);
      }
    }

    fetchExams();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-900 mb-6">My Exams</h1>

        {/* Static Demo Exam Widget */}
        <div className="bg-white shadow-md hover:shadow-lg rounded-xl p-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 border-teal-500 transition-all duration-200">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-teal-900 text-xl">Demo Exam</h2>
            <p className="text-gray-600">Duration: No time limit</p>
            <p className="text-sm text-teal-600">Static practice questions to get you started</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <a
              href="/dashboard/student/demo-exam"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors duration-200 inline-block shadow-sm"
            >
              Start Demo
            </a>
          </div>
        </div>

        {exams.length === 0 ? (
          <div className="p-6 bg-teal-100 border-l-4 border-teal-400 text-teal-800 rounded shadow-md">
            No exam published yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {exams.map((exam) => {
              const now = new Date();
              const start = new Date(exam.startTime);
              const end = new Date(exam.endTime);

              const canAttend = now >= start && now <= end;
              const hasSubmitted = submittedExams.has(exam._id);

              return (
                <li
                  key={exam._id}
                  className="bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-shadow duration-200 border-l-4"
                  style={{
                    borderColor: hasSubmitted
                      ? "#9CA3AF" // gray
                      : canAttend
                        ? "#14B8A6" // teal
                        : "#FBBF24", // yellow for not available yet
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-teal-900 text-lg">
                      {exam.title}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      Starts: {start.toLocaleString()}
                    </p>
                    <p className="text-gray-700 text-sm">
                      Ends: {end.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0">
                    {hasSubmitted ? (
                      <span className="bg-gray-400 text-white px-4 py-2 rounded-xl font-semibold">
                        Attended
                      </span>
                    ) : canAttend ? (
                      <a
                        href={`/dashboard/student/exam/${exam._id}`}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200"
                      >
                        Attend
                      </a>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl font-semibold">
                        Not available
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
