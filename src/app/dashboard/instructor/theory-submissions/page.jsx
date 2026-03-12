"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react"; // nice arrow icon

export default function TheorySubmissionsListPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/instructor/exam-list?type=theory");
        const data = await res.json();

        const sorted = (data.exams || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setExams(sorted);
      } catch (err) {
        console.error("Failed to load exams:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  if (loading)
    return <p className="p-6 text-teal-700 font-medium">Loading exams...</p>;
  if (!exams.length)
    return <p className="p-6 text-gray-600">No theory exams found.</p>;

  return (
    <main className="p-6 min-h-screen bg-primary">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">
        Theory Exam Submissions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg shadow-lg">
          <thead className="bg-teal-100">
            <tr>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Exam Title
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Batches
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam, index) => (
              <tr
                key={exam._id}
                className={`transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-teal-50"
                } hover:bg-teal-100`}
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {exam.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {exam.batchNames && exam.batchNames.length > 0
                    ? exam.batchNames.join(", ")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(exam.startTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(exam.endTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/instructor/theory-submissions/${exam._id}`}
                    className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    View
                    <ChevronRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
