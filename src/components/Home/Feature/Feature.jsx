"use client";

import { motion } from "framer-motion";

import { BsStopwatch } from "react-icons/bs";
import {
  FaHourglassEnd,
  FaChartPie,
  FaChartLine,
  FaDatabase,
  FaCalendarAlt,
  FaUsersCog,
} from "react-icons/fa";
import { SiLogstash } from "react-icons/si";
import { RiShuffleLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";

const features = [
  {
    id: 1,
    title: "Timed Examination",
    description:
      "Real-time countdown timer with automatic start and 1-minute warning notifications.",
    icon: BsStopwatch,
    image:
      "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Auto Submission",
    description:
      "Strict time enforcement with automatic submission when timer reaches zero.",
    icon: FaHourglassEnd,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Proctor Activity Logs",
    description:
      "Detects and logs tab switching, window blur, and page reload attempts.",
    icon: SiLogstash,
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Question & Option Shuffle",
    description:
      "Unique question and option order for each student to prevent cheating.",
    icon: RiShuffleLine,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Auto Grading System",
    description: "Instant MCQ grading with automatic marks calculation.",
    icon: IoIosCheckmarkCircle,
    image:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Instant Score Breakdown",
    description:
      "View total score, correct/incorrect answers, percentage, and pass/fail status.",
    icon: FaChartPie,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Analytics Dashboard",
    description:
      "Track averages, highest/lowest marks, pass/fail ratios, and question accuracy.",
    icon: FaChartLine,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Question Bank Management",
    description:
      "Add, edit, delete questions with marks and subject categorization.",
    icon: FaDatabase,
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Exam Scheduling",
    description:
      "Create exams, set duration, and get upcoming exam notifications.",
    icon: FaCalendarAlt,
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Role-Based Dashboards",
    description: "Separate dashboards for Admin, Instructor, and Students.",
    icon: FaUsersCog,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Feature() {
  return (
    <section className="relative py-24 bg-emerald-950 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            Core Capabilities
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Advanced{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Exam Features
            </span>
          </h2>
          <p className="text-lg text-emerald-100/70 max-w-2xl mx-auto leading-relaxed">
            Experience a seamless, automated, and highly secure environment
            tailored for modern online assessments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-emerald-900/30 rounded-2xl overflow-hidden group cursor-pointer flex flex-col transition-all duration-300 border border-emerald-800/50 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:border-emerald-500/40 hover:bg-emerald-800/40"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 bg-emerald-900/50 overflow-hidden shrink-0 block">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100  group-hover:mix-blend-normal transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600";
                  }}
                />

                {/* Dark Gradient Overlay over Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent z-10"></div>

                {/* Floating Icon inside Image */}
                <div className="absolute bottom-4 right-4 bg-emerald-800/80 backdrop-blur-md border border-emerald-600/50 p-3 rounded-xl shadow-lg text-emerald-300 z-20 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-400 transition-all duration-300">
                  <feature.icon className="text-2xl" />
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col relative">
                {/* Subtle top border accent on hover */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2">
                  {feature.title}
                </h3>
                <p className="text-emerald-100/60 leading-relaxed text-sm md:text-base group-hover:text-emerald-100/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
