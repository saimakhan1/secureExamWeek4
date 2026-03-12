"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, LogIn, Calendar, Mail, Clock } from "lucide-react";
import axios from "axios";

export default function LoginsPage() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogins();
  }, []);

  const fetchLogins = async () => {
    try {
      const response = await axios.get(
        "/api/admin/analytics/activities-by-type",
      );
      setLogins(response.data.data.logins);
    } catch (error) {
      console.error("Error fetching logins:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/admin/analytics"
          className="inline-flex items-center text-gray-600 hover:text-[#0D7C66] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Analytics
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LogIn className="w-8 h-8 text-blue-600" />
          Recent Logins
        </h1>
        <p className="text-gray-500 mt-1">All user login activities</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {logins.length === 0 ? (
          <div className="text-center py-12">
            <LogIn className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No logins yet today</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {logins.map((login, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {login.userName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {login.userName}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {login.userEmail}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3" />
                      {formatDate(login.timestamp)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {login.userRole}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
