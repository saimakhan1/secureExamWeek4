"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Eye,
  BarChart3,
  Trophy,
  TrendingUp,
  TrendingDown,
  ClipboardList,
  Activity,
} from "lucide-react";

export default function InstructorAnalyticsPage() {
  const { data: session } = useSession();

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const [examPerformance, setExamPerformance] = useState([]);

  // Fetch exams and prepare overall performance
  useEffect(() => {
    if (!session) return;

    const fetchExams = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/exams");
        const data = await res.json();

        const examList = data.exams || [];
        setExams(examList);

        const performance = [];

        for (const exam of examList) {
          try {
            const resAnalytics = await fetch(
              `/api/instructor/analytics/${exam._id}`,
            );
            const dataAnalytics = await resAnalytics.json();

            if (resAnalytics.ok) {
              // ✅ Calculate score percentage correctly
              const scorePercentage =
                exam.totalMarks && exam.totalMarks > 0
                  ? (
                      (dataAnalytics.averageScore / exam.totalMarks) *
                      100
                    ).toFixed(2)
                  : 0;

              performance.push({
                exam: exam.title,
                score: Number(scorePercentage),
              });
            }
          } catch (err) {
            console.error("Performance fetch error:", err);
          }
        }

        setExamPerformance(performance);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [session]);

  // Fetch analytics for selected exam
  const fetchAnalytics = async (examId) => {
    if (!examId) return;

    setSelectedExamId(examId);
    setAnalytics(null);
    setAnalyticsLoading(true);

    try {
      const res = await fetch(`/api/instructor/analytics/${examId.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Analytics fetch failed:", data);
        alert(data.message || "Failed to fetch analytics");
        setAnalytics(null);
      } else {
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      alert("Failed to fetch analytics");
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading exams...</div>
    );

  return (
    <main className="bg-primary min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-teal-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">
            Instructor Analytics
          </h1>
        </div>

        {/* GENERAL PERFORMANCE HORIZONTAL CHART */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-teal-600" size={20} />
            Overall Exam Score Rate (%)
          </h2>

          {examPerformance.length === 0 ? (
            <p className="text-gray-500">No exam analytics available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                layout="vertical"
                data={examPerformance}
                margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(val) => `${val}%`}
                />
                <YAxis type="category" dataKey="exam" tick={{ fontSize: 14 }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="score" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Exams Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={18} className="text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  {exam.title}
                </h2>
              </div>

              <p className="text-gray-600 text-sm">
                Type:{" "}
                <span className="font-medium">
                  {exam.type?.toUpperCase() || "-"}
                </span>
              </p>

              <p className="text-gray-600 text-sm">
                Duration:{" "}
                <span className="font-medium">
                  {exam.duration || "-"} minutes
                </span>
              </p>

              <button
                onClick={() => fetchAnalytics(exam._id.toString())}
                className="mt-5 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                <Eye size={16} />
                View Analytics
              </button>
            </div>
          ))}
        </div>

        {/* Analytics Loading */}
        {analyticsLoading && (
          <div className="text-center text-gray-500">Loading analytics...</div>
        )}

        {/* Selected Exam Analytics */}
        {analytics && !analyticsLoading && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                <TrendingUp className="text-green-600" size={30} />
                <div>
                  <p className="text-gray-500 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.averageScore}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                <Trophy className="text-yellow-500" size={30} />
                <div>
                  <p className="text-gray-500 text-sm">Highest Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.highestScore}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                <TrendingDown className="text-red-500" size={30} />
                <div>
                  <p className="text-gray-500 text-sm">Lowest Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.lowestScore}
                  </p>
                </div>
              </div>
            </div>

            {/* Question Accuracy Chart */}
            {/* <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-teal-600" />
                Question Accuracy
              </h2>

              {analytics.questionAccuracy.length === 0 ? (
                <p className="text-gray-500">
                  No questions or submissions available for this exam.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={analytics.questionAccuracy}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="question"
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="accuracy"
                      fill="#0f766e"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div> */}
          </div>
        )}
      </div>
    </main>
  );
}
