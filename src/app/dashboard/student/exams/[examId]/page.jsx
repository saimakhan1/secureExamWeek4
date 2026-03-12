//dashboard/student/exams/[examId]/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function StudentExamPage({ params }) {
  // const { id } = params; //
  const { examId } = params; //
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExam() {
      const res = await fetch(`/api/exams/${id}`);
      if (!res.ok) {
        alert("Exam not found or access denied");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setExam(data);

      // Check if already submitted
      const attemptRes = await fetch(`/api/exam-attempts/${id}`);
      const attemptData = await attemptRes.json();
      if (attemptRes.ok && attemptData.submitted) {
        setSubmitted(true);
      }

      setLoading(false);
    }
    fetchExam();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!exam) return;

    const payload = {
      examId: id,
      answers: Object.entries(answers).map(([qid, ans]) => ({
        questionId: qid,
        answer: ans,
      })),
    };

    const res = await fetch("/api/exam-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert(
      `Submitted successfully${data.totalMarks != null ? ` | Marks: ${data.totalMarks}` : ""}`,
    );
    setSubmitted(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!exam) return <p>Exam not found or access denied.</p>;

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>

      {submitted ? (
        <p className="text-green-600 font-semibold">
          You have already submitted this exam.
        </p>
      ) : (
        <>
          {exam.questions && exam.questions.length > 0 ? (
            <ul className="space-y-4">
              {exam.questions.map((q) => (
                <li key={q._id}>
                  <p className="font-medium">{q.questionText}</p>
                  {exam.examType === "MCQ" ? (
                    q.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={q._id}
                          value={opt}
                          checked={answers[q._id] === opt}
                          onChange={(e) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                        />
                        {opt}
                      </label>
                    ))
                  ) : (
                    <textarea
                      rows={3}
                      className="w-full border p-2 rounded"
                      value={answers[q._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available for this exam yet.</p>
          )}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Submit Exam
          </button>
        </>
      )}
    </main>
  );
}
