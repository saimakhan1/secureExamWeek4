"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function PaymentModal({ course, onClose, itemType = "course" }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Format as MM/YY
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate card fields
    if (!cardNumber || !expiryDate || !cvc) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all card details",
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Validate card number (16 digits)
    const cardDigits = cardNumber.replace(/\s/g, "");
    if (cardDigits.length !== 16) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card",
        text: "Card number must be 16 digits",
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Validate expiry (MM/YY)
    if (expiryDate.length !== 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Expiry",
        text: "Please enter expiry date as MM/YY",
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Validate CVC (3-4 digits)
    if (cvc.length < 3 || cvc.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Invalid CVC",
        text: "CVC must be 3-4 digits",
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    setLoading(true);

    try {
      // Create checkout session
      const res = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          courseName: course.title,
          amount: course.price,
          cardNumber: cardDigits,
          expiryDate: expiryDate,
          cvc: cvc,
          itemType: itemType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment has been processed. Redirecting...",
        confirmButtonColor: "#0D7C66",
      }).then(() => {
        onClose();
        window.location.href = "/dashboard/student/payment-history";
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message || "Something went wrong",
        confirmButtonColor: "#0D7C66",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-[#0D7C66] text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Course Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{course.description}</p>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-[#0D7C66]">
                ${(course.price / 100).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4242 4242 4242 4242"
                maxLength="19"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7C66] font-mono"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7C66] font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7C66] font-mono"
                />
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
              🔒 Test Mode - Use card: 4242 4242 4242 4242
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 bg-[#0D7C66] text-white rounded-lg font-medium hover:bg-[#0a5d50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
