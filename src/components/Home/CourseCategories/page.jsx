"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BadgeDollarSign, 
  Cpu, 
  PencilRuler, 
  MessageSquareText, 
  FileBadge, 
  BookOpen, 
  TrendingUp, 
  PersonStanding 
} from "lucide-react";

// ক্যাটাগরি ডেটা
const categories = [
  { id: 1, title: "Business & Finance", courses: 1, icon: BadgeDollarSign },
  { id: 2, title: "Computer Science", courses: 3, icon: Cpu },
  { id: 3, title: "Design", courses: 1, icon: PencilRuler },
  { id: 4, title: "English Learning", courses: 1, icon: MessageSquareText },
  { id: 5, title: "Fundamental Marketing", courses: 1, icon: FileBadge },
  { id: 6, title: "Geometry & Maths", courses: 2, icon: BookOpen },
  { id: 7, title: "Marketing", courses: 3, icon: TrendingUp },
  { id: 8, title: "Personal Development", courses: 2, icon: PersonStanding },
];

// Framer Motion ভ্যারিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    backgroundColor: "#ffffff", // ডিফল্ট ব্যাকগ্রাউন্ড
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export default function CourseCategories() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 w-full min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-[1px] bg-gray-400"></div>
              <p className="text-sm font-semibold tracking-widest text-emerald-800 uppercase">
                Select Your
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Explore Top Courses <span className="text-emerald-900 underline decoration-emerald-800 decoration-4 underline-offset-8">Categories</span>
            </h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#144b36] hover:bg-[#0f3a29] text-white px-8 py-3.5 rounded-md font-medium transition-colors duration-300 shadow-md"
          >
            Browse All Categories
          </motion.button>
        </div>

        {/* Grid Section with Framer Motion */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: "#064e3b", // emerald-900 Color on hover
                  boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.4)", // সুন্দর ও বড় শ্যাডো
                  borderColor: "#064e3b" 
                }}
                // Tailwind এর group ক্লাস ব্যবহার করা হয়েছে ভেতরের কন্টেন্ট কন্ট্রোল করার জন্য
                className="group shadow-lg border border-gray-100 rounded-xl p-8 flex flex-col gap-5 cursor-pointer"
              >
                {/* Icon */}
                <div className="text-[#144b36] group-hover:text-white transition-colors duration-300">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                
                {/* Texts */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium group-hover:text-emerald-200 transition-colors duration-300">
                    {category.courses} course(s)
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}