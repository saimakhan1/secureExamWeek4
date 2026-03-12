"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import PaymentModal from "@/components/PaymentModal";

export default function PremiumCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <main className="p-8 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Premium Resources</h1>
          <p className="text-gray-500 text-lg">
            Explore and purchase top-tier online courses.
          </p>
        </div>

        <Link 
          href="/dashboard/student/online-courses"
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition shadow-sm"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl bg-purple-100 p-2 rounded-full">💎</span>
          <div>
            <h2 className="text-2xl font-bold text-purple-700">Premium Courses</h2>
            <p className="text-gray-500 text-sm">Unlock advanced courses and exclusive interactive content.</p>
          </div>
        </div>
        
        {courses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-purple-50">
            <p className="text-gray-500 text-lg">No premium courses available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </div>

      {showPaymentModal && selectedCourse && (
        <PaymentModal course={selectedCourse} onClose={handlePaymentClose} itemType="course" />
      )}
    </main>
  );
}
