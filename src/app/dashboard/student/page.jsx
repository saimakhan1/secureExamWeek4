"use client";

import { useEffect, useState } from "react";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const res = await fetch("/api/results");
      const data = await res.json();
      setResults(data);
    }
    fetchResults();
  }, []);

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">My Results</h1>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((r) => (
            <div key={r._id} className="border p-4 rounded shadow-sm bg-white">
              <p>
                <strong>Exam ID:</strong> {r.examId}
              </p>
              <p>
                <strong>Score:</strong> {r.score} / {r.totalMarks}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(r.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
