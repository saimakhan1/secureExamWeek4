"use client";

import { motion } from "framer-motion";
import { FaUserGraduate, FaHeadset, FaStar } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { MdOutlineSentimentSatisfied } from "react-icons/md";

const stats = [
  {
    id: 1,
    icon: FaUserGraduate,
    score: "9.8/10",
    label: "Student Satisfaction",
  },
  {
    id: 2,
    icon: FaHeadset,
    score: "4.9/5",
    label: "Live Exam Support",
  },
  {
    id: 3,
    icon: BsShieldCheck,
    score: "99.9%",
    label: "System Reliability",
  },
  {
    id: 4,
    icon: MdOutlineSentimentSatisfied,
    score: "4.9/5",
    label: "Ease of Use",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StudentReviews() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Small Top Heading */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-[#113c27]"></div>
            <span className="text-[#113c27] text-sm font-semibold uppercase tracking-[0.15em]">
              Student Feedback
            </span>
            <div className="h-[1px] w-10 bg-[#113c27]"></div>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#202224] mb-6 tracking-tight max-w-4xl mx-auto leading-[1.2]">
            Trusted by Students for Seamless{" "}
            <span className="text-[#113c27] underline decoration-2 underline-offset-8">
              Online Exams
            </span>
          </h2>
          
          {/* Paragraph */}
          <p className="text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Our secure and intuitive assessment platform ensures a distraction-free testing environment, empowering students to focus on their performance without worrying about technical hurdles.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Large Icon (No background, just the colored icon like the image) */}
              <div className="mb-6 text-[#113c27] group-hover:-translate-y-2 transition-transform duration-300">
                <stat.icon className="text-[5.5rem]" />
              </div>

              {/* Score Badge with Top Triangle */}
              <div className="relative bg-[#113c27] text-white font-bold text-2xl px-6 py-2 rounded flex items-center justify-center gap-2 mb-4 min-w-[140px] shadow-md">
                {/* CSS Triangle pointing UP */}
                <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-[#113c27]"></div>
                
                {stat.score}
                <FaStar className="text-[#fbbf24] text-xl" />
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold text-[#202224]">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}