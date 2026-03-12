"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ExamDetailPage() {
  const params = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exams/${params.examId}`);
        const data = await res.json();
        setExam(data.exam);
      } catch (err) {
        console.error("Failed to fetch exam:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExam();
  }, [params.examId]);

  if (loading) return <p className="p-6">Loading exam questions...</p>;
  if (!exam) return <p className="p-6">Exam not found.</p>;

  return (
    <main className="p-6 mt-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{exam.title} - Questions</h1>

      {exam.questions && exam.questions.length > 0 ? (
        <ol className="space-y-4">
          {exam.questions.map((q, idx) => (
            <li key={q._id} className="border p-4 rounded shadow-sm bg-white">
              <p className="font-medium">
                Q{idx + 1}: {q.questionText}
              </p>
              {q.options && (
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p>No questions found for this exam.</p>
      )}
    </main>
  );
}
