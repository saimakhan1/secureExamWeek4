// src/app/dashboard/instructor/page.jsx
"use client";

import { useSession } from "next-auth/react";

export default function InstructorDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Instructor Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <p>Role: {session.user.role}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">My Courses</div>
        <div className="p-4 bg-white shadow rounded">Exams</div>
      </div>
    </div>
  );
}
