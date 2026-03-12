//dashboard/instructor/theory-submissions/[examId]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InstructorTheorySubmissionsPage() {
  const { examId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!examId) return;

    async function fetchSubmissions() {
      try {
        const res = await fetch(`/api/instructor/theory-submissions/${examId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch");
          setSubmissions([]);
        } else {
          setSubmissions(data.submissions || []);
        }
      } catch (err) {
        setError("Network error");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [examId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <main className="p-6 bg-primary min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Theory Submissions</h1>

      {submissions.length === 0 && <p>No submissions found.</p>}

      {submissions.map((s) => (
        <div key={s._id} className="border-8 border-teal-500 p-4 mb-4 rounded">
          <p className="font-semibold">Student: {s.studentEmail}</p>

          <div className="mt-2">
            {Object.entries(s.answersWithMarks || {}).map(
              ([qid, { questionText, answer, maxMarks, awarded }], idx) => (
                <div key={qid} className="mb-4 border-b pb-3">
                  <p className="font-medium">
                    Q{idx + 1}: {questionText} ({maxMarks} marks)
                  </p>

                  <p className="ml-2 text-gray-700 mt-1">
                    <strong>Student Answer:</strong> {answer}
                  </p>

                  {s.scores?.[qid] != null ? (
                    <p className="text-green-600 mt-2">
                      Score: {s.scores[qid]} / {maxMarks}
                    </p>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="number"
                        min={0}
                        max={maxMarks}
                        id={`score-${s._id}-${qid}`}
                        className="border px-2 py-1 w-24"
                      />
                      <button
                        className="bg-teal-600 text-white px-4 py-1 rounded"
                        onClick={() =>
                          gradeSubmission(
                            s._id,
                            qid,
                            Number(
                              document.getElementById(`score-${s._id}-${qid}`)
                                .value,
                            ),
                            maxMarks,
                          )
                        }
                      >
                        Grade
                      </button>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>

          <p className="mt-3 font-semibold text-lg">
            Total Score: {s.score} / {s.totalMarks}
          </p>
        </div>
      ))}
    </main>
  );

  async function gradeSubmission(submissionId, qid, score, maxMarks) {
    if (score < 0) return alert("Cannot be negative");
    if (score > maxMarks) return alert(`Cannot exceed ${maxMarks}`);

    const res = await fetch(`/api/instructor/theory-submissions/${examId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, qid, score }),
    });

    if (res.ok) {
      alert("Graded successfully");
      location.reload();
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }
}
