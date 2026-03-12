"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FiBell, FiCalendar } from "react-icons/fi"; // Feather icons

export default function NotificationsPage() {
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchNotifications() {
      try {
        // 1️⃣ Fetch existing messages (batch, manual, published exams)
        const resMessages = await fetch("/api/messages");
        const dataMessages = await resMessages.json();
        const baseMessages = (
          Array.isArray(dataMessages) ? dataMessages : []
        ).filter((msg) => msg.to === session.user.email);

        // 2️⃣ Fetch student exams
        const resExams = await fetch("/api/student/exams");
        const dataExams = await resExams.json();
        const exams = dataExams.exams || [];

        // 3️⃣ Create notifications for upcoming exams (within 3 days)
        const now = new Date();
        const examNotifications = exams
          .map((exam) => {
            const start = new Date(exam.startTime);
            const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
            if (diffDays > 0 && diffDays <= 3) {
              return {
                _id: `exam-${exam._id}-${diffDays}`,
                to: session.user.email,
                message: `Upcoming exam "${exam.title}" in ${diffDays} day(s).`,
                type: "exam",
                createdAt: new Date().toISOString(),
              };
            }
            return null;
          })
          .filter(Boolean);

        // 4️⃣ Merge messages & sort by newest first
        setMessages(
          [
            ...baseMessages.map((m) => ({ ...m, type: "general" })),
            ...examNotifications,
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }

    fetchNotifications();
  }, [session]);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FiBell className="text-teal-700 w-8 h-8" />
          <h1 className="text-3xl font-bold text-teal-900">Notifications</h1>
        </div>

        {/* Notifications List */}
        {messages.length === 0 ? (
          <div className="p-6 bg-teal-100 border-l-4 border-teal-400 text-teal-800 rounded shadow-md flex items-center gap-3">
            <FiBell className="w-6 h-6" />
            <span>No notifications yet</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-l-4"
                style={{
                  borderColor: msg.type === "exam" ? "#14B8A6" : "#0D9488",
                }}
              >
                <div className="flex items-center gap-2">
                  {msg.type === "exam" ? (
                    <FiCalendar className="text-teal-500 w-5 h-5" />
                  ) : (
                    <FiBell className="text-teal-500 w-5 h-5" />
                  )}
                  <span className="text-gray-800 font-medium">
                    {msg.message}
                  </span>
                </div>
                <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
