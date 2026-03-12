"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// ডামি প্রাইসিং ডেটা (Meaningful English Features)
const pricingData = {
  monthly: [
    {
      id: 1,
      name: "Basic",
      billing: "Billed Every Month, Cancel Every Time.",
      price: "$35",
      period: "/Month",
      features: [
        "Access to 50+ basic courses",
        "Standard community forum access",
        "1 basic certification included",
        "Standard HD video quality",
        "Email support within 48 hours",
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: "Standard",
      billing: "Billed Every 3 Months, Cancel Every Time.",
      price: "$85",
      period: "/Month",
      features: [
        "0% transaction fees on platform*",
        "Access to 500+ premium courses",
        "5 professional certifications",
        "Priority email & chat support",
        "Downloadable course materials",
      ],
      isPopular: true,
    },
    {
      id: 3,
      name: "Premium",
      billing: "Billed Every 6 Months, Cancel Every Time.",
      price: "$250",
      period: "/Month",
      features: [
        "Unlimited access to all courses",
        "1-on-1 monthly mentorship sessions",
        "Unlimited professional certifications",
        "24/7 VIP priority support",
        "Lifetime access to updated materials",
      ],
      isPopular: false,
    },
  ],
  annual: [
    {
      id: 1,
      name: "Basic",
      billing: "Billed Every Year, Cancel Every Time.",
      price: "$350",
      period: "/Year",
      features: [
        "Access to 50+ basic courses",
        "Standard community forum access",
        "1 basic certification included",
        "Standard HD video quality",
        "Email support within 48 hours",
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: "Standard",
      billing: "Billed Every Year, Cancel Every Time.",
      price: "$850",
      period: "/Year",
      features: [
        "0% transaction fees on platform*",
        "Access to 500+ premium courses",
        "5 professional certifications",
        "Priority email & chat support",
        "Downloadable course materials",
      ],
      isPopular: true,
    },
    {
      id: 3,
      name: "Premium",
      billing: "Billed Every Year, Cancel Every Time.",
      price: "$2500",
      period: "/Year",
      features: [
        "Unlimited access to all courses",
        "1-on-1 monthly mentorship sessions",
        "Unlimited professional certifications",
        "24/7 VIP priority support",
        "Lifetime access to updated materials",
      ],
      isPopular: false,
    },
  ],
};

// Framer Motion ভ্যারিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardLoadVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const currentPlans = isAnnual ? pricingData.annual : pricingData.monthly;

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-gray-400"></span>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              PRICE PLANS
            </p>
            <span className="h-[1px] w-12 bg-gray-400"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            View Our <span className="text-[#134e36] underline decoration-[#134e36] decoration-4 underline-offset-8">Course</span> <span className="text-[#134e36] underline decoration-[#134e36] decoration-4 underline-offset-8">Offerings</span> And Our<br className="hidden md:block" /> Planned Fee Schedule
          </h2>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center bg-white border border-[#134e36] rounded-full p-1 w-64">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 text-sm font-semibold py-2.5 rounded-full transition-colors duration-300 ${
                !isAnnual ? "bg-[#134e36] text-white" : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 text-sm font-semibold py-2.5 rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-[#134e36] text-white" : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          {currentPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardLoadVariants}
              initial="rest"
              whileHover={!plan.isPopular ? "hover" : "rest"}
              animate="rest"
              className={`relative overflow-hidden rounded-md border-t-8 border-t-[#134e36] shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col group ${
                plan.isPopular ? "bg-[#134e36] text-white" : "bg-white border-x border-b border-gray-100"
              }`}
            >
              {/* Framer Motion Background Slide Effect (For non-popular cards) */}
              {!plan.isPopular && (
                <motion.div
                  variants={{
                    rest: { height: "0%" },
                    hover: { height: "100%" },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full bg-[#134e36] z-0"
                />
              )}

              {/* Card Content Wrapper (z-10 ensures it stays above the animated background) */}
              <div className="relative z-10 p-10 flex flex-col flex-grow">
                {/* Plan Header */}
                <div className="mb-8 border-b border-gray-200/30 pb-8">
                  <h3 className={`text-3xl font-bold mb-4 transition-colors duration-400 ${
                    plan.isPopular ? "text-white" : "text-gray-900 group-hover:text-white"
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mb-6 transition-colors duration-400 ${
                    plan.isPopular ? "text-gray-200" : "text-gray-500 group-hover:text-gray-200"
                  }`}>
                    {plan.billing}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-6xl font-extrabold transition-colors duration-400 ${
                      plan.isPopular ? "text-white" : "text-gray-900 group-hover:text-white"
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-medium transition-colors duration-400 ${
                      plan.isPopular ? "text-white" : "text-gray-900 group-hover:text-white"
                    }`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  className={`w-4/5 py-3 rounded text-sm font-bold transition-colors duration-400 mb-8 ${
                    plan.isPopular
                      ? "bg-white text-[#134e36] hover:bg-gray-100"
                      : "bg-[#222222] text-white group-hover:bg-white group-hover:text-[#134e36]"
                  }`}
                >
                  Purchase This Plan
                </button>

                {/* Features List */}
                <ul className="flex flex-col gap-4 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-400 ${
                        plan.isPopular ? "bg-white" : "bg-gray-400 group-hover:bg-white"
                      }`}></span>
                      <span className={`text-sm leading-relaxed transition-colors duration-400 ${
                        plan.isPopular ? "text-gray-100" : "text-gray-600 group-hover:text-gray-100"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <div className="mt-16 text-center max-w-4xl mx-auto text-xs text-gray-500 leading-relaxed">
          <p>*Pro, Pro+, and course plan have 0% transaction fees with any payment gateway (i.e. online: pay Monthly or Yearly via Gateway).</p>
          <p>All plans will automatically renew until canceled. Recurring charges may be subject to changes.</p>
          <p>
            Plans can be canceled any time. <a href="#" className="underline hover:text-gray-800">Standard Processing fees apply.</a> Have questions? Contact <a href="mailto:support@example.com" className="underline hover:text-gray-800">support@example.com</a>
          </p>
        </div>

      </div>
    </section>
  );
}