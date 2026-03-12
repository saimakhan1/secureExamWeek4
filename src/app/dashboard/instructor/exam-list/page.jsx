"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FileText,
  Clock,
  ListChecks,
  BookOpen,
  Users,
  Calendar,
  Eye,
  Send,
} from "lucide-react";

export default function ExamListPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);

  // Fetch exams
  useEffect(() => {
    if (!session) return;

    async function fetchExams() {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [session]);

  // Publish exam
  const handlePublish = async (examId) => {
    if (
      !confirm(
        "Publish this exam? Students will be notified and MCQs cannot be edited after publishing.",
      )
    )
      return;

    try {
      const res = await fetch("/api/exams/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setExams((prev) =>
          prev.map((e) =>
            e._id === examId
              ? { ...e, published: true, status: "published" }
              : e,
          ),
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish exam");
    }
  };

  // View questions
  const handleViewQuestions = async (examId) => {
    setQuestionLoading(true);

    try {
      const res = await fetch(`/api/exams/${examId}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load questions");
        return;
      }

      setSelectedExam(data.exam || data);
    } catch (error) {
      console.error(error);
      alert("Error loading questions");
    } finally {
      setQuestionLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading exams...</p>;

  return (
    <main className="p-8 bg-primary max-w-full mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Exam Management</h1>

      {exams.length === 0 ? (
        <p className="text-gray-500">No exams found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const calculatedTotalMarks =
              exam.totalMarks ??
              (exam.questions
                ? exam.questions.reduce((sum, q) => sum + (q.marks || 1), 0)
                : "-");

            return (
              <div
                key={exam._id}
                className="bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
              >
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" />
                  {exam.title || "-"}
                </h2>

                {/* Info */}
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-indigo-500" />
                    <span className="font-medium">Type:</span>
                    {exam.type?.toUpperCase() || "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-indigo-500" />
                    <span className="font-medium">Duration:</span>
                    {exam.duration ?? "-"} minutes
                  </div>

                  <div className="flex items-center gap-2">
                    <ListChecks size={16} className="text-indigo-500" />
                    <span className="font-medium">Total Questions:</span>
                    {exam.questionsCount ?? "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-500" />
                    <span className="font-medium">Total Marks:</span>
                    {calculatedTotalMarks}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-indigo-500" />
                    <span className="font-medium">Batches:</span>
                    {exam.batchNames && exam.batchNames.length > 0
                      ? exam.batchNames.join(", ")
                      : "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    <span className="font-medium">Start:</span>
                    {exam.startTime
                      ? new Date(exam.startTime).toLocaleString()
                      : "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    <span className="font-medium">End:</span>
                    {exam.endTime
                      ? new Date(exam.endTime).toLocaleString()
                      : "-"}
                  </div>
                </div>

                {/* Status + Buttons */}
                <div className="flex items-center justify-between mt-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      exam.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {exam.published ? "Published" : "Draft"}
                  </span>

                  <div className="flex gap-2">
                    {!exam.published && (
                      <button
                        onClick={() => handlePublish(exam._id)}
                        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        <Send size={14} />
                        Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleViewQuestions(exam._id)}
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      <Eye size={14} />
                      {questionLoading && selectedExam?._id === exam._id
                        ? "Loading..."
                        : "View"}
                    </button>
                    {/* <button
                      onClick={() =>
                        window.open(
                          `/dashboard/instructor/exam/${exam._id}/questions`,
                          "_blank",
                        )
                      }
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      View to edit
                    </button> */}
                    <button
                      onClick={() => {
                        if (exam?.status === "published") {
                          alert(
                            "This question set has been published, you cannot edit anymore",
                          );
                          return;
                        }

                        window.open(
                          `/dashboard/instructor/exam/${exam._id}/questions`,
                          "_blank",
                        );
                      }}
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      View to edit
                    </button>
                  </div>
                </div>

                {/* Questions */}
                {selectedExam && selectedExam._id === exam._id && (
                  <div className="mt-5 pt-4 border-t">
                    <h3 className="font-semibold mb-3 text-gray-800">
                      Questions
                    </h3>

                    {selectedExam.questions?.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No questions added yet.
                      </p>
                    ) : (
                      <>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                          {selectedExam.questions?.map((q) => (
                            <li key={q._id}>
                              {q.questionText || "-"}{" "}
                              <span className="text-green-700 text-xs">
                                {/* (Answer: {q.correctOption || "-"}) */}
                                (Answer:{" "}
                                {exam.type === "mcq"
                                  ? (q.correctOption ?? "-")
                                  : "Answers not available"}
                                )
                              </span>{" "}
                              <span className="text-indigo-600 text-xs">
                                — Marks: {q.marks ?? 1}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 font-semibold text-gray-800">
                          Total Marks:{" "}
                          {selectedExam.questions?.reduce(
                            (sum, q) => sum + (q.marks || 1),
                            0,
                          ) ?? "-"}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
