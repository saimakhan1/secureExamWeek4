"use client";

import { useEffect, useState } from "react";

export default function InstructorExamPage({ params }) {
  const { id } = params;
  const [exam, setExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/exams/${id}`);
      const examData = await res.json();
      setExam(examData);

      const subRes = await fetch(`/api/exam-attempts/${id}`);
      const subData = await subRes.json();
      setSubmissions(subData.attempts || []);

      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!exam) return <p>Exam not found or access denied.</p>;

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>

      {exam.examType === "MCQ" && (
        <p>
          MCQ Questions: {exam.questions.length} | Submitted:{" "}
          {submissions.length}
        </p>
      )}

      {exam.examType === "Theoretical" && (
        <div>
          <h2 className="font-bold mt-4 mb-2">Theoretical Submissions</h2>
          {submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <ul className="space-y-4">
              {submissions.map((s) => (
                <li key={s._id} className="border p-2 rounded">
                  <p>
                    <strong>Student:</strong> {s.studentEmail}
                  </p>
                  <p>
                    <strong>Answer:</strong>{" "}
                    {s.answers.map((a) => a.answer).join(", ")}
                  </p>
                  <p>
                    <strong>Graded:</strong> {s.graded ? "Yes" : "Pending"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
