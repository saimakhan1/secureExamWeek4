"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Settings, UploadCloud, ShieldAlert, Activity, Users } from 'lucide-react';

export default function ForInstructors() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-emerald-950 py-24 px-6 overflow-hidden flex items-center"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Settings className="w-4 h-4" />
              Instructor Control Panel
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Powerful Tools <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
                For Instructors
              </span>
            </h1>
            <p className="text-emerald-100/70 mb-10 text-lg leading-relaxed">
              Create, monitor, and grade exams effortlessly. SecureExam does the heavy lifting with AI-driven insights so you can focus on education and student success.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              { icon: <UploadCloud className="w-6 h-6"/>, title: "Bulk Question Import", desc: "Easily upload questions via Excel or let our AI generate them instantly." },
              { icon: <UserCheck className="w-6 h-6"/>, title: "Live Proctoring Dashboard", desc: "Monitor all active students in real-time with automatic AI-flagged alerts." },
              { icon: <Settings className="w-6 h-6"/>, title: "Custom Grading", desc: "Set up automated grading rules or review subjective answers manually." }
            ].map((feature, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.2) }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-emerald-900/30 border border-emerald-800/50 hover:bg-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div className="bg-emerald-800/50 p-3 rounded-xl text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-inner flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1 group-hover:text-emerald-300 transition-colors">{feature.title}</h4>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Dashboard Mockup */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Outer Glass Container */}
            <div className="bg-emerald-900/40 p-3 md:p-5 rounded-3xl border border-emerald-700/50 backdrop-blur-md shadow-2xl relative z-10">
              
              {/* Inner Dashboard UI (Tailwind Mockup) */}
              <div className="bg-slate-900 w-full h-[450px] rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner flex flex-col font-sans">
                
                {/* Dashboard Top Bar */}
                <div className="h-12 bg-slate-800/80 border-b border-slate-700 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-slate-400 text-xs font-medium tracking-wide">Live Session: CS101 Final</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 border border-emerald-400"></div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 p-5 overflow-hidden flex flex-col gap-4">
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-1"><Users className="w-3 h-3"/> Active</div>
                      <div className="text-white font-bold text-lg">142</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-1"><Activity className="w-3 h-3"/> Avg. Progress</div>
                      <div className="text-emerald-400 font-bold text-lg">68%</div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-xl border border-red-900/50">
                      <div className="flex items-center gap-2 text-red-400 text-xs mb-1"><ShieldAlert className="w-3 h-3"/> Flagged</div>
                      <div className="text-red-400 font-bold text-lg">3</div>
                    </div>
                  </div>

                  {/* Live Student List Mockup */}
                  <div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                    <h3 className="text-slate-300 text-sm font-semibold mb-3 border-b border-slate-700 pb-2">Live Monitoring</h3>
                    <div className="space-y-3">
                      {[
                        { name: "John Doe", status: "Focusing", color: "bg-emerald-500" },
                        { name: "Sarah Smith", status: "Looking Away", color: "bg-yellow-500" },
                        { name: "Michael B.", status: "Multiple Faces", color: "bg-red-500" },
                        { name: "Emma Wilson", status: "Focusing", color: "bg-emerald-500" },
                      ].map((student, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-800 p-2 rounded-lg border border-slate-700/50">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs text-slate-300">{student.name.charAt(0)}</div>
                            <span className="text-slate-200 text-sm">{student.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">{student.status}</span>
                            <span className={`w-2 h-2 rounded-full ${student.color} animate-pulse`}></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating Live Indicator */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-right-8 bg-slate-900 text-white p-3 md:p-4 rounded-xl shadow-[0_0_30px_rgb(16,185,129,0.3)] border border-emerald-500/30 flex items-center gap-3 z-20"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="font-semibold text-sm">AI Proctor Active</span>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
}