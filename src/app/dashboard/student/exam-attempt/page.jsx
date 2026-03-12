"use client";

import { useEffect, useState, useRef } from "react";

export default function ExamAttempt({ searchParams }) {
  const examId = searchParams.examId;
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef(null);

  // Fetch exam
  useEffect(() => {
    async function fetchExam() {
      const res = await fetch(`/api/exams/${examId}`);
      if (!res.ok) return alert("Exam not found or access denied");
      const data = await res.json();

      setExam(data);

      const now = new Date();
      const endTime = new Date(data.endTime);
      setTimeLeft(Math.floor((endTime - now) / 1000));
    }

    fetchExam();
  }, [examId]);

  // Start countdown timer
  useEffect(() => {
    if (!exam || submitted) return;
    if (timeLeft <= 0) return handleSubmit();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [exam, submitted, timeLeft]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (submitted || !exam) return;

    clearInterval(timerRef.current);

    const payload = {
      examId,
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
      `Exam submitted successfully | Marks: ${data.score} / ${data.totalMarks}`,
    );
    setSubmitted(true);
  };

  if (!exam) return <div>Loading exam...</div>;
  if (submitted)
    return <div className="p-6 mt-20">Exam submitted successfully!</div>;

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-xl font-bold">{exam.title}</h1>
      <p className="text-red-600 font-semibold mt-2">
        Time left: {formatTime(timeLeft)}
      </p>

      {exam.questions.length === 0 ? (
        <p>No questions available yet.</p>
      ) : (
        <ul className="space-y-4 mt-4">
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
                  className="w-full border p-2 rounded"
                  rows={3}
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Exam
      </button>
    </div>
  );
}
