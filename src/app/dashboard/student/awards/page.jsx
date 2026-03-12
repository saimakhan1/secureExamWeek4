//app/dashboard/student/awards/page.jsx

"use client";

import { useEffect, useState } from "react";

export default function StudentAwardsPage() {
  const awards = [
    {
      id: 1,
      title: "Top React Developer",
      student: "Mahim Hasan",
      course: "MERN Stack",
      date: "10 Feb 2026",
    },
    {
      id: 2,
      title: "Outstanding Project",
      student: "Nusrat Jahan",
      course: "Web Development",
      date: "05 Feb 2026",
    },
    {
      id: 3,
      title: "Best Problem Solver",
      student: "Rafiul Islam",
      course: "Algorithms",
      date: "28 Jan 2026",
    },
  ];

  const [myAwards, setMyAwards] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    async function loadAwards() {
      try {
        const res = await fetch("/api/student/awards");
        const data = await res.json();

        setMyAwards(data.awards || []);
        setTotalGems(data.totalGems || 0);
        setStudentName(data.studentName || "");
      } catch (err) {
        console.error("Awards load error", err);
      }
    }

    loadAwards();
  }, []);

  return (
    <div className="bg-primary min-h-screen">
      <div className="p-6">
        <div className="student-awards">
          <h1 className="text-2xl font-bold mb-6">Student Awards</h1>

          {/* Example Awards (existing UI preserved) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white shadow-md rounded-xl p-5 "
              >
                <h2 className="text-lg font-semibold text-secondary">
                  {award.title}
                </h2>

                <p className="mt-2 text-gray-700">
                  <span className="font-medium">Student:</span> {award.student}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Course:</span> {award.course}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Awarded on: {award.date}
                </p>

                <button className="mt-4 w-full bg-secondary text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* My Gems Section */}
          <div className="my-awards mt-10">
            <h2 className="text-xl font-bold mb-4">My Awards</h2>

            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
              <p className="font-semibold text-lg">
                Hello {studentName || "Student"}!
              </p>

              <p>
                Total Gems Earned: <strong>💎 {totalGems}</strong>
              </p>
            </div>

            {myAwards.length === 0 ? (
              <p className="text-gray-500">No gems earned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAwards.map((award) => (
                  <div
                    key={award._id}
                    className="bg-yellow-50 border-primary rounded-xl p-5 shadow"
                  >
                    <h3 className="text-lg font-semibold text-yellow-700">
                      {award.examTitle}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Score: {award.percentage}%
                    </p>

                    <p className="text-gray-600">
                      Gems Earned: 💎 {award.gems}
                    </p>

                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(award.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
