"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  Mail,
  DollarSign,
} from "lucide-react";
import axios from "axios";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        "/api/admin/analytics/activities-by-type",
      );
      setPurchases(response.data.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
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
          <CreditCard className="w-8 h-8 text-green-600" />
          Recent Purchases
        </h1>
        <p className="text-gray-500 mt-1">All course purchases</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No purchases yet today</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {purchases.map((purchase, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {purchase.userName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">
                        {purchase.userName}
                      </p>
                      {purchase.amount && (
                        <span className="text-lg font-bold text-[#0D7C66]">
                          ${purchase.amount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {purchase.courseName || purchase.details}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-2 mt-2">
                      <Mail className="w-3 h-3" />
                      {purchase.userEmail}
                      <span className="mx-1">•</span>
                      <Calendar className="w-3 h-3" />
                      {formatDate(purchase.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
