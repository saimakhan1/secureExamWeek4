"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

const GetStarted = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative py-24 bg-emerald-950 overflow-hidden flex justify-center items-center px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center shadow-[0_20px_50px_rgba(16,185,129,0.15)] overflow-hidden"
      >
        {/* Inner Card Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-600/50 text-emerald-300 text-sm font-semibold mb-6 tracking-widest uppercase"
          >
            Start Your Journey
          </motion.div>

          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            Ready to Transform <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
              Your Exams?
            </span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Join hundreds of institutions using SecureExam today to automate proctoring, prevent cheating, and streamline grading.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div 
            variants={itemVariants}
            className="w-full sm:w-auto"
          >
            <Link 
              href="/" 
              className="group flex items-center justify-center gap-3 bg-emerald-500 text-white font-bold text-lg md:text-xl px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <FaTelegramPlane size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /> 
              Get Started for Free
            </Link>
          </motion.div>

          {/* Bottom Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-emerald-200/70 text-sm md:text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <IoIosCheckmarkCircle className="text-emerald-400 text-xl" />
              <span>No credit card required</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-emerald-600/50"></div>
            <div className="flex items-center gap-2">
              <IoIosCheckmarkCircle className="text-emerald-400 text-xl" />
              <span>Free 14-day trial</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-emerald-600/50"></div>
            <div className="flex items-center gap-2">
              <IoIosCheckmarkCircle className="text-emerald-400 text-xl" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;