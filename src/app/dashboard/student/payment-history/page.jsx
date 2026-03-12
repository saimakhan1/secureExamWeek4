"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PaymentHistoryPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const res = await fetch("/api/payments/history");
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-600">Loading payment history...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">Payment History</h1>
      <p className="text-gray-600 mb-8">
        View all your previous payments and transactions
      </p>

      {payments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">No payments yet</p>
          <p className="text-gray-400 mt-2">
            Your payment history will appear here once you make a purchase
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D7C66] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Course/Exam</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Time</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium">{payment.courseName}</td>
                    <td className="px-6 py-4 font-semibold text-[#0D7C66]">
                      ${(payment.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          payment.status === "completed"
                            ? "bg-green-200 text-green-800"
                            : payment.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatTime(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {payment.transactionId || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {payments.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Total Payments:</strong> {payments.length} | 
            <strong className="ml-4">Total Spent:</strong> ${(
              payments
                .filter((p) => p.status === "completed")
                .reduce((sum, p) => sum + p.amount, 0) / 100
            ).toFixed(2)}
          </p>
        </div>
      )}
    </main>
  );
}