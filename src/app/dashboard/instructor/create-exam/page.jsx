"use client";

import { useState, useEffect } from "react";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  /* ---------------- Fetch batches ---------------- */
  useEffect(() => {
    fetch("/api/batches")
      .then((r) => r.json())
      .then(setBatches)
      .catch(console.error);
  }, []);

  /* -------- Auto calculate end time -------- */
  useEffect(() => {
    if (!startTime || !duration) return;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    const offset = end.getTimezoneOffset() * 60000;
    setEndTime(new Date(end - offset).toISOString().slice(0, 16));
  }, [startTime, duration]);

  const getMinDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now - offset).toISOString().slice(0, 16);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Exam title required");
    if (duration <= 0) return alert("Invalid duration");
    if (!startTime || !endTime) return alert("Time required");
    if (new Date(endTime) <= new Date(startTime))
      return alert("End time must be after start time");
    if (selectedBatches.length === 0) return alert("Select at least one batch");

    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        type,
        duration,
        startTime,
        endTime,
        batchIds: selectedBatches,
        totalQuestions: type === "mcq" ? Number(totalQuestions) : 0,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Failed");

    alert("Exam created successfully");
    setTitle("");
    setTotalQuestions(0);
    setSelectedBatches([]);
    setDuration(60);
    setStartTime("");
    setEndTime("");
  };

  return (
    <main className="p-6 bg-primary flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#0D7C66]">
          Create Exam
        </h1>

        {/* Exam Title */}
        <div>
          <label className="block font-medium mb-1">Exam Title</label>
          <input
            className="w-full p-3 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Exam Type */}
        <div>
          <label className="block font-medium mb-1">Exam Type</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">MCQ</option>
            <option value="theory">Theoretical</option>
          </select>
        </div>

        {/* MCQ Only */}
        {type === "mcq" && (
          <div>
            <label className="block font-medium mb-1">
              Total MCQ Questions
            </label>
            <input
              type="number"
              min={1}
              className="w-full p-3 border rounded-lg"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              required
            />
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            min={1}
            className="w-full p-3 border rounded-lg"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg"
              min={getMinDateTime()}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg bg-gray-100"
              value={endTime}
              readOnly
            />
          </div>
        </div>

        {/* Batches */}
        <div>
          <label className="block font-medium mb-1">Assign Batches</label>
          <select
            multiple
            className="w-full p-3 border rounded-lg"
            value={selectedBatches}
            onChange={(e) =>
              setSelectedBatches(
                Array.from(e.target.selectedOptions, (o) => o.value),
              )
            }
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full bg-[#0D7C66] text-white py-3 rounded-xl font-semibold hover:bg-[#41B3A2]">
          Create Exam
        </button>
      </form>
    </main>
  );
}
