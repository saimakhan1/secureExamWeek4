"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  FaUniversity, 
  FaGraduationCap, 
  FaSchool, 
  FaBuilding, 
  FaLandmark, 
  FaBookReader 
} from "react-icons/fa";

// Dynamic Data Array with Meaningful Descriptions
const institutions = [
  { 
    id: 1, 
    name: "Universities", 
    desc: "Conducting highly secure, proctored semester exams at a massive scale.",
    icon: FaUniversity 
  },
  { 
    id: 2, 
    name: "Colleges", 
    desc: "Managing fair entrance tests and automated student evaluations.",
    icon: FaGraduationCap 
  },
  { 
    id: 3, 
    name: "K-12 Schools", 
    desc: "Running daily quizzes, mid-terms, and instant automated grading.",
    icon: FaSchool 
  },
  { 
    id: 4, 
    name: "Corporate Academies", 
    desc: "Seamless employee training assessments and certification programs.",
    icon: FaBuilding 
  },
  { 
    id: 5, 
    name: "Govt. Institutes", 
    desc: "Hosting transparent and unbiased large-scale recruitment tests.",
    icon: FaLandmark 
  },
  { 
    id: 6, 
    name: "Coaching Centers", 
    desc: "Organizing weekly mock tests with instant performance analytics.",
    icon: FaBookReader 
  },
];

const Trusted = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-emerald-950 py-24 lg:py-32  border-emerald-800/40 overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[60rem] h-[300px] bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            Global Recognition
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Trusted by 500+ <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Leading Institutions
            </span>
          </h2>
          <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto leading-relaxed">
            From high-stakes university exams to corporate certifications, our platform adapts to the unique assessment needs of every educational sector.
          </p>
        </motion.div>

        {/* Dynamic Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {institutions.map((inst) => (
            <motion.div
              key={inst.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-emerald-900/30 border border-emerald-800/50 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-4 hover:bg-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 group shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
            >
              {/* Icon Container */}
              <div className="p-4 rounded-xl bg-emerald-900/80 border border-emerald-700/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-colors duration-300">
                <inst.icon className="text-3xl" />
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                  {inst.name}
                </h3>
                <p className="text-emerald-100/60 leading-relaxed text-sm md:text-base group-hover:text-emerald-100/80 transition-colors duration-300">
                  {inst.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Trusted;