//dashboard/student/result/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/student/result");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading results...</div>
    );

  if (!results.length)
    return (
      <div className="p-6 text-center text-gray-500">
        You have no results yet.
      </div>
    );

  return (
    <main className="p-6  mx-auto min-h-screen bg-primary">
      <h1 className="text-3xl font-bold mb-8  text-center text-teal-800">
        My Exam Results
      </h1>

      <div className="space-y-6">
        {results.map((r) => (
          <div
            key={r.examId}
            className="bg-gradient-to-r from-teal-50 to-teal-100 shadow-lg rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between transition hover:scale-105"
          >
            <div className="flex-1 mb-3 md:mb-0">
              <h2 className="text-xl font-semibold text-teal-900">{r.title}</h2>
              <p className="text-sm text-teal-700 mt-1">
                Exam Type:{" "}
                <span className="font-medium">
                  {r.examCategory || r.examType?.toUpperCase() || "Unknown"}
                </span>
              </p>
              <p className="text-sm text-teal-700 mt-1">
                Submitted At:{" "}
                <span className="font-medium">
                  {new Date(r.submittedAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-teal-700">Result</p>
                <p
                  className={`mt-1 font-semibold ${
                    r.status === "pending"
                      ? "text-yellow-600"
                      : r.status === "graded"
                        ? "text-green-600"
                        : "text-blue-600"
                  }`}
                >
                  {r.status === "pending" ? "Pending grading" : r.marksObtained}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-teal-700">Total Marks</p>
                <p className="mt-1 font-semibold text-teal-900">
                  {r.totalMarks}
                </p>
              </div>

              <button
                onClick={() =>
                  router.push(`/dashboard/student/result/${r.examId}`)
                }
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
