"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      const res = await fetch("/api/exams");
      const data = await res.json();

      const now = new Date();
      // Only show published exams that are ongoing or upcoming
      const visibleExams = data.filter(
        (e) =>
          e.published &&
          new Date(e.startTime) <= new Date(e.endTime) && // started or will start
          new Date(e.endTime) > now, // not ended
      );

      setExams(visibleExams);
    }

    fetchExams();
    const interval = setInterval(fetchExams, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Available Exams</h1>

      {exams.length === 0 ? (
        <p>No exams available currently.</p>
      ) : (
        exams.map((exam) => {
          const now = new Date();
          const start = new Date(exam.startTime);
          const end = new Date(exam.endTime);

          const status =
            now < start
              ? `Starts at ${start.toLocaleString()}`
              : now > end
                ? "Ended"
                : "Ongoing";

          return (
            <div
              key={exam._id}
              className="border p-4 rounded mb-3 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{exam.title}</h2>
                <p>Duration: {exam.duration} minutes</p>
                <p className="text-sm text-gray-600">{status}</p>
              </div>

              {now >= start && now <= end && (
                <Link
                  href={`/student/exam-attempt?examId=${exam._id}`}
                  className="text-blue-600 font-medium"
                >
                  Start Exam
                </Link>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
