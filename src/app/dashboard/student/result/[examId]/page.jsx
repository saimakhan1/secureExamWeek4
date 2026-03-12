//dashboard/student/result/[examId]/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ExamDetailPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/student/result`);
        const data = await res.json();
        const exam = data.results.find((r) => r.examId === examId);
        setResult(exam || null);
      } catch (err) {
        console.error("Failed to fetch exam details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [examId]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading exam details...
      </div>
    );

  if (!result)
    return (
      <div className="p-6 text-center text-gray-500">
        Result not found.
        <button
          className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );

  // --- Calculate percentage and pass/fail ---
  const percentage =
    result.totalMarks > 0
      ? ((result.marksObtained / result.totalMarks) * 100).toFixed(2)
      : 0;
  const passBoundary = 50; // pass if >= 50%
  const passed = percentage >= passBoundary;

  return (
    <main className="bg-primary min-h-screen">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 shadow-lg rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-teal-900">{result.title}</h1>
          <p className="text-teal-700 mt-1">
            Exam Type:{" "}
            <span className="font-medium">
              {result.examCategory ||
                result.examType?.toUpperCase() ||
                "Unknown"}
            </span>
          </p>
          <p className="text-teal-700 mt-1">
            Submitted At:{" "}
            <span className="font-medium">
              {new Date(result.submittedAt).toLocaleString()}
            </span>
          </p>
          <p className="text-teal-700 mt-1">
            Marks Obtained:{" "}
            <span className="font-semibold text-green-600">
              {result.marksObtained}
            </span>{" "}
            / {result.totalMarks}
          </p>
          <p className="text-teal-700 mt-1">
            Percentage: <span className="font-semibold">{percentage}%</span>
          </p>
          <p className="text-teal-700 mt-1">
            Status:{" "}
            <span
              className={`font-semibold ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed ? "PASS" : "FAIL"} (Pass boundary: {passBoundary}%)
            </span>
          </p>
          <p className="text-teal-700 mt-1">
            Grading Status:{" "}
            <span className="font-semibold">
              {result.status === "graded" ? "Graded" : "Pending"}
            </span>
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {Object.entries(result.answersWithMarks).map(([qid, ans]) => {
            const isCorrect = ans.awarded === ans.maxMarks && ans.maxMarks > 0;
            const partial = ans.awarded > 0 && ans.awarded < ans.maxMarks;

            return (
              <div
                key={qid}
                className="bg-white shadow-md rounded-xl p-4 border-l-4"
                style={{
                  borderColor: isCorrect
                    ? "#14B8A6" // teal for full marks
                    : partial
                      ? "#F59E0B" // yellow for partial
                      : "#EF4444", // red for zero
                }}
              >
                <h2 className="text-teal-900 font-semibold mb-1">
                  {ans.questionText}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {ans.answer}
                </p>

                {result.examType === "mcq" && ans.correctAnswer && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    {ans.correctAnswer}
                  </p>
                )}

                <p className="text-gray-700">
                  <span className="font-semibold">Marks Obtained:</span>{" "}
                  <span
                    className={`font-semibold ${
                      isCorrect
                        ? "text-green-600"
                        : partial
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {ans.awarded} / {ans.maxMarks}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md"
          >
            Back to Results
          </button>
        </div>
      </div>
    </main>
  );
}
