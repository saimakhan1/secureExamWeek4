"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";

export default function CertificationExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 6;

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/exam/paid-exam");
      const data = await res.json();
      setExams(data.exams || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyExam = (exam) => {
    setSelectedExam(exam);
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedExam(null);
  };

  // Pagination logic
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(exams.length / examsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <main className="p-8 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D7C66]"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Certification Exams</h1>
          <p className="text-gray-500 text-lg">
            Ready to test your knowledge and get certified?
          </p>
        </div>

        <Link 
          href="/dashboard/student/online-courses"
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition shadow-sm"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="bg-white border-2 border-[#0D7C66]/20 p-8 rounded-2xl shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl bg-green-50 p-3 rounded-xl">🎓</span>
          <h2 className="text-xl font-bold text-[#0D7C66]">Available Exams</h2>
        </div>
        <p className="text-gray-600 text-md mb-8 max-w-2xl">
          Validate your skills with our industry-recognized certification exams. Choose an exam below and start climbing in your career.
        </p>
        
        {exams.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-xl text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No certification exams available right now.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl divide-y divide-gray-100 shadow-sm">
            {currentExams.map((exam) => (
              <div key={exam._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 hover:bg-gray-50 transition">
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg text-gray-800">{exam.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{exam.description}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm font-medium text-[#0D7C66] bg-green-50 px-2 py-1 rounded">
                      {exam.duration} mins
                    </span>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {exam.totalQuestions} Questions
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleBuyExam(exam)}
                  className="w-full sm:w-auto bg-[#0D7C66] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#0a5d50] transition shadow-sm whitespace-nowrap"
                >
                  Enroll - ${(exam.price / 100).toFixed(2)}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-green-50 text-[#0D7C66] hover:bg-green-100"
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  currentPage === index + 1
                    ? "bg-[#0D7C66] text-white shadow-md"
                    : "bg-green-50 text-[#0D7C66] hover:bg-green-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-green-50 text-[#0D7C66] hover:bg-green-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showPaymentModal && selectedExam && (
        <PaymentModal course={selectedExam} onClose={handlePaymentClose} itemType="exam" />
      )}
    </main>
  );
}
