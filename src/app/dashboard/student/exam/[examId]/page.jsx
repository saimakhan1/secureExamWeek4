//dashboard/student/exam/[examId]/page.jsx

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

export default function StudentExamPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex or text }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warningMessage, setWarningMessage] = useState(""); // new state for warnings
  const timerRef = useRef(null);

  // Fetch exam + questions
  useEffect(() => {
    if (!examId) return;

    async function fetchExam() {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/exam/${examId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load exam");

        setExam(data.exam);
        setQuestions(data.questions || []);
        setTimeLeft(data.exam.duration * 60);
      } catch (err) {
        console.error(err);
        alert(err.message);
        router.push("/dashboard/student");
      } finally {
        setLoading(false);
      }
    }

    fetchExam();
  }, [examId, router]);

  // Check if already submitted
  useEffect(() => {
    if (!examId) return;

    async function checkSubmission() {
      try {
        const res = await fetch(`/api/student/exam/${examId}/submitted`);
        if (!res.ok) return;
        const data = await res.json();
        setHasSubmitted(data.submitted);
      } catch (err) {
        console.error(err);
      }
    }

    checkSubmission();
  }, [examId]);

  // Timer countdown with warning messages
  useEffect(() => {
    if (hasSubmitted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true); // auto-submit
          setWarningMessage(""); // clear warning
          return 0;
        }

        // Show warning message if less than 5 minutes left
        if (prev <= 5 * 60) {
          setWarningMessage(
            `⏰ Time left: ${formatTime(prev)} — get ready to submit your answers!`,
          );
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [hasSubmitted, timeLeft]);

  const handleSelect = (questionId, value) => {
    if (hasSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (auto = false) => {
    if (hasSubmitted) return;

    if (!auto && Object.keys(answers).length !== questions.length) {
      return alert("Please answer all questions before submitting.");
    }

    if (!auto && !confirm("Submit your answers?")) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/student/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, answers }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (!auto) alert(data.message || "Submit failed");
        return;
      }

      setHasSubmitted(true);
      clearInterval(timerRef.current);

      if (!auto) {
        alert(`Submitted! Your score: ${data.score}`);
      } else {
        alert("Time is up! Your exam was submitted automatically.");
      }

      router.push("/dashboard/student/result");
    } catch (err) {
      console.error(err);
      alert("Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <p className="p-6 mt-20">Loading exam...</p>;
  if (!exam) return <p className="p-6 mt-20 text-red-500">Exam not found</p>;

  return (
    <main className="bg-primary min-h-screen">
      <div className="p-6  max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>

        {hasSubmitted && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
            You have already submitted this exam. Answers are locked.
          </div>
        )}

        {!hasSubmitted && (
          <>
            <div className="mb-2 p-3 bg-blue-100 text-blue-800 rounded font-semibold">
              Time Left: {formatTime(timeLeft)}
            </div>
            {warningMessage && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded font-medium animate-pulse">
                {warningMessage}
              </div>
            )}
          </>
        )}

        <p className="mb-2">Type: {exam.type.toUpperCase()}</p>
        <p className="mb-2">Duration: {exam.duration} min</p>
        <p className="mb-4">Total Questions: {questions.length}</p>
        <hr className="my-4" />

        {questions.map((q, i) => (
          <div
            key={q._id}
            className="mb-6 p-4  border-teal-500 border-4 rounded-2xl"
          >
            <p className="font-medium mb-2">
              Q{i + 1}: {q.questionText} ({q.marks} marks)
            </p>

            {exam.type === "mcq" && (
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={q._id}
                      value={idx}
                      disabled={hasSubmitted}
                      checked={answers[q._id] === idx}
                      onChange={() => handleSelect(q._id, idx)}
                      className="form-radio"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {exam.type === "theory" && (
              <textarea
                className="w-full border rounded p-2 mt-2"
                rows={4}
                disabled={hasSubmitted}
                value={answers[q._id] || ""}
                onChange={(e) => handleSelect(q._id, e.target.value)}
                placeholder="Write your answer here..."
              />
            )}
          </div>
        ))}

        <button
          onClick={() => handleSubmit(false)}
          disabled={submitting || hasSubmitted}
          className="w-full py-3 bg-[#0D7C66] hover:bg-[#41B3A2] disabled:bg-gray-400 text-white font-semibold rounded-xl"
        >
          {hasSubmitted
            ? "Already Submitted"
            : submitting
              ? "Submitting..."
              : "Submit Exam"}
        </button>
      </div>
    </main>
  );
}
