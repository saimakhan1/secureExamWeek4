"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';

export default function ForStudents() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-emerald-950 py-24 px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <GraduationCap className="w-4 h-4" />
            Student-First Approach
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Seamless Experience <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
              For Students
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="text-emerald-100/70 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Focus on your exams without technical distractions. Our intuitive interface ensures a stress-free testing environment from start to finish.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {[
            { icon: <Laptop className="w-8 h-8"/>, title: "Easy Access", desc: "Join exams instantly using a secure link. No complex software installation required on your personal computer." },
            { icon: <ShieldCheck className="w-8 h-8"/>, title: "Secure Browser", desc: "A locked-down environment that prevents unauthorized tabs and applications to maintain exam integrity." },
            { icon: <BookOpen className="w-8 h-8"/>, title: "Distraction-Free", desc: "Clean and minimal UI designed to help you concentrate solely on answering your questions." }
          ].map((item, idx) => (
            <motion.div 
              key={idx} variants={itemVariants} 
              className="relative p-8 rounded-3xl bg-emerald-900/30 border border-emerald-800/50 backdrop-blur-md shadow-2xl hover:bg-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Card Top Border Accent on Hover */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

              {/* Icon Container */}
              <div className="relative mb-6 mt-2">
                <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                <div className="relative bg-emerald-800/50 text-emerald-300 w-20 h-20 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300 border border-emerald-700/50 shadow-inner">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-emerald-100/60 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}