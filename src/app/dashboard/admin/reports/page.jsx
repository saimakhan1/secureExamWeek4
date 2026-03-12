"use client";

import { useState, useEffect } from "react";
import { BarChart2, PieChart, FileText, Users, Layers } from "lucide-react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports([
      {
        id: 1,
        name: "Student Performance",
        icon: "BarChart2",
        description: "Overview of all students' scores",
      },
      {
        id: 2,
        name: "Attendance",
        icon: "Users",
        description: "Track student attendance",
      },
      {
        id: 3,
        name: "Exam Reports",
        icon: "FileText",
        description: "Detailed exam results",
      },
      {
        id: 4,
        name: "Batch Analytics",
        icon: "PieChart",
        description: "Insights per batch",
      },
      {
        id: 5,
        name: "Course Progress",
        icon: "Layers",
        description: "Track course completion",
      },
    ]);
  }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "BarChart2":
        return (
          <BarChart2 className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
        );
      case "PieChart":
        return (
          <PieChart className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
        );
      case "FileText":
        return (
          <FileText className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
        );
      case "Users":
        return (
          <Users className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
        );
      case "Layers":
        return (
          <Layers className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen p-6 bg-primary dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Admin Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage all your reports from one place
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center group"
            >
              {renderIcon(report.icon)}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {report.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">
                {report.description}
              </p>
              <button className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105">
                View Report
              </button>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <Users className="mx-auto mb-4 w-12 h-12" />
            <p>No reports available</p>
          </div>
        )}
      </div>
    </main>
  );
}
