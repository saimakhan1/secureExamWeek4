"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiPlayCircle } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import { assets } from "@/assets/assets";

const HomeHero = () => {
  // Rotating Words Array
  const words = ["Online Exams", "Live Proctoring", "Assessments", "Skill Tests"];
  const [index, setIndex] = useState(0);

  // Interval for changing words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="relative min-h-screen bg-emerald-950 overflow-hidden flex items-center py-20 lg:py-0 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-12 relative z-10 w-full">
        
        {/* ================= LEFT SIDE ================= */}
        <motion.section 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="left-side w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-900/50 border border-emerald-700/50 backdrop-blur-md rounded-full text-emerald-300 w-fit shadow-[0_0_15px_rgb(16,185,129,0.1)] hidden md:flex"
          >
            <IoIosCheckmarkCircle size={20} className="text-emerald-400" />
            <span className="text-sm font-medium tracking-wide">
              Trusted by 500+ Institutions Worldwide
            </span>
          </motion.div>

          {/* Heading - With Rotating Text Animation */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.2]"
          >
            Secure, Fair, & Automated <br />
            {/* Wrapper for animated text to prevent layout shift */}
            <span className="inline-block mt-2 h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200 drop-shadow-sm inline-block pb-2"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-emerald-100/70 max-w-xl leading-relaxed mt-2"
          >
            From automatic proctoring logs to instant grading— SecureExam provides
            a seamless examination experience for universities, coaching centers,
            and online platforms.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
          >
            <Link
              href="/"
              className="flex gap-2 items-center px-8 py-4 rounded-xl text-white font-semibold text-lg bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgb(16,185,129,0.3)] hover:shadow-[0_0_30px_rgb(16,185,129,0.5)] w-full sm:w-auto justify-center group"
            >
              <HiPlayCircle size={24} className="group-hover:scale-110 transition-transform" />
              Start free trial
            </Link>

            <Link
              href="/"
              className="flex gap-2 items-center px-8 py-4 rounded-xl text-emerald-50 font-semibold text-lg bg-emerald-900/40 border border-emerald-700/50 backdrop-blur-sm hover:bg-emerald-800/60 hover:border-emerald-500/50 transition-all w-full sm:w-auto justify-center group"
            >
              <FaEye size={20} className="group-hover:text-emerald-300 transition-colors" />
              View Demo
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 w-full max-w-xl"
          >
            {[
              { value: "50K+", label: "Active Students" },
              { value: "10K+", label: "Exams Conducted" },
              { value: "98%", label: "Satisfaction" }
            ].map((stat, idx) => (
              <div key={idx} className="rounded-2xl px-6 py-5 bg-emerald-900/30 backdrop-blur-md border border-emerald-800/50 text-center hover:bg-emerald-800/40 transition-colors">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-emerald-200/60 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ================= RIGHT SIDE ================= */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="right-side w-full lg:w-1/2 flex justify-center lg:justify-end mb-12 lg:mb-0 relative"
        >
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-75"></div>
          
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image
              src={assets.home_hero_img}
              alt="SecureExam Dashboard Hero"
              width={650}
              height={550}
              className="w-[100%] lg:pr-20  sm:w-[90%] md:w-[100%] lg:w-[138%] max-w-[650px] h-auto drop-shadow-[0_20px_50px_rgb(0,0,0,0.5)]"
              priority
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomeHero;