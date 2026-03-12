"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session?.user?.name}!</p>
      <p>Role: {session?.user?.role}</p> */}

      {/* Quick Actions - Now Clickable */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/admin/users">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
              👥 Manage Users
            </h3>
            <p className="text-gray-600">
              View, add, edit, and manage all users
            </p>
          </div>
        </Link>

        {/* <Link href="/dashboard/admin/reports">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
              📊 Reports & Analytics
            </h3>
            <p className="text-gray-600">
              View exam reports and system analytics
            </p>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
