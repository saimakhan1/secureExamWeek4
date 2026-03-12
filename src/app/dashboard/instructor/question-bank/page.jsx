//dashboard/instructor/question-bank/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function QuestionBankPage() {
  const { data: session } = useSession();

  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  /* MCQ fields */
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(1);

  /* Theory fields */
  const [theoryQuestion, setTheoryQuestion] = useState("");
  const [theoryMarks, setTheoryMarks] = useState(10);

  /* ---------------- Fetch Exams ---------------- */
  useEffect(() => {
    if (!session) return;
    fetch("/api/exams")
      .then((r) => r.json())
      .then((d) => setExams(d.exams || []))
      .catch(console.error);
  }, [session]);

  /* ---------------- Permissions ---------------- */
  const canAddMCQ =
    selectedExam &&
    selectedExam.type === "mcq" &&
    !selectedExam.published &&
    questionCount < selectedExam.totalQuestions;

  const canAddTheory =
    selectedExam && selectedExam.type === "theory" && !selectedExam.published;

  /* ---------------- Add MCQ ---------------- */
  const handleAddMCQ = async (e) => {
    e.preventDefault();
    if (!canAddMCQ) return;

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: selectedExam._id,
        questionText,
        options,
        correctOption,
        marks,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);
      setMarks(1);
      setQuestionCount((c) => c + 1);
    }
  };

  /* ---------------- Add Theory Question ---------------- */
  const handleAddTheory = async (e) => {
    e.preventDefault();
    if (!canAddTheory) return;

    const res = await fetch("/api/theory-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: selectedExam._id,
        questionText: theoryQuestion,
        marks: theoryMarks,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setTheoryQuestion("");
      setTheoryMarks(10);
    }
  };

  return (
    <main className="bg-primary min-h-screen p-6">
      <div className="p-6 rounded-2xl max-w-3xl mx-auto bg-white">
        <h1 className="text-3xl font-bold mb-6 text-[#0D7C66]">
          Question Bank
        </h1>

        {/* Exam Selector */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Select Exam</label>
          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => {
              const exam = exams.find((x) => x._id === e.target.value);
              setSelectedExam(exam || null);
              setQuestionCount(exam?.questionsCount || 0);
            }}
          >
            <option value="">-- Select Exam --</option>
            {exams.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title} ({e.type})
              </option>
            ))}
          </select>
        </div>

        {/* Exam Status */}
        {selectedExam && (
          <div className="mb-4 text-sm text-gray-600">
            Status: {selectedExam.published ? "Published" : "Draft"}
          </div>
        )}

        {/* MCQ SECTION */}
        {canAddMCQ && (
          <form
            onSubmit={handleAddMCQ}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            <h2 className="text-xl font-semibold text-purple-700">
              Add MCQ Question
            </h2>

            <div>
              <label className="block mb-1">Question</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
            </div>

            {options.map((opt, i) => (
              <div key={i}>
                <label className="block mb-1">Option {i + 1}</label>
                <input
                  className="w-full p-2 border rounded-lg"
                  value={opt}
                  onChange={(e) => {
                    const arr = [...options];
                    arr[i] = e.target.value;
                    setOptions(arr);
                  }}
                  required
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Correct Option (0–3)</label>
                <input
                  type="number"
                  min={0}
                  max={3}
                  value={correctOption}
                  onChange={(e) => setCorrectOption(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">Marks</label>
                <input
                  type="number"
                  min={1}
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
              Add MCQ
            </button>

            <p className="text-sm text-gray-500">
              Added {questionCount} / {selectedExam.totalQuestions}
            </p>
          </form>
        )}

        {/* THEORY SECTION */}
        {canAddTheory && (
          <form
            onSubmit={handleAddTheory}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            <h2 className="text-xl font-semibold text-blue-700">
              Add Theory Question
            </h2>

            <div>
              <label className="block mb-1">Question</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                value={theoryQuestion}
                onChange={(e) => setTheoryQuestion(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Marks</label>
              <input
                type="number"
                min={1}
                value={theoryMarks}
                onChange={(e) => setTheoryMarks(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Add Theory Question
            </button>
          </form>
        )}

        {/* LOCKED MESSAGE */}
        {selectedExam && selectedExam.published && (
          <p className="text-red-500 mt-6">
            This exam is published. Question editing is locked.
          </p>
        )}
      </div>
    </main>
  );
}
