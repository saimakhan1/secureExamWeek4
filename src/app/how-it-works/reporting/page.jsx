"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, PieChart } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// চার্টের জন্য কিছু ডামি ডাটা
const analyticsData = [
  { month: 'Jan', avgScore: 65, trustScore: 85 },
  { month: 'Feb', avgScore: 72, trustScore: 88 },
  { month: 'Mar', avgScore: 68, trustScore: 92 },
  { month: 'Apr', avgScore: 85, trustScore: 95 },
  { month: 'May', avgScore: 82, trustScore: 96 },
  { month: 'Jun', avgScore: 90, trustScore: 98 },
];

export default function ReportingAnalytics() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="min-h-screen bg-emerald-900 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
        
        {/* Left Side Content (Text & Metrics) */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">In-Depth <br/><span className="text-emerald-400">Reporting & Analytics</span></h1>
          <p className="text-emerald-50/80 mb-10 text-lg">Make data-driven decisions with comprehensive performance metrics, class insights, and automated trust scores.</p>
          
          <div className="space-y-8">
            {[
              { icon: <BarChart3/>, title: "Performance Metrics", desc: "Analyze class averages, standard deviations, and easily identify student knowledge gaps." },
              { icon: <FileText/>, title: "Integrity Reports", desc: "Detailed timeline logs of all flagged activities with video and audio proof." },
              { icon: <PieChart/>, title: "Automated Trust Score", desc: "Each student receives a unique AI-generated trust score based on their session behavior." }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}
                className="flex gap-5"
              >
                <div className="bg-emerald-800/50 p-4 rounded-xl text-emerald-400 border border-emerald-700/50 h-fit">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-2xl mb-2">{item.title}</h4>
                  <p className="text-emerald-100/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right Side Content (Dynamic Chart) */}
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}
            className="bg-emerald-800/40 p-6 rounded-3xl border border-emerald-700/50 backdrop-blur-md relative"
          >
            {/* Dynamic Recharts Dashboard */}
             <div className="bg-slate-900 h-[400px] p-4 rounded-2xl shadow-2xl w-full">
                <h3 className="text-slate-300 font-semibold mb-4 text-center">Class Performance Over Time</h3>
                
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                        itemStyle={{ color: '#34d399' }}
                      />
                      <Area type="monotone" dataKey="avgScore" name="Avg Score" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>

            {/* Floating Element Animation */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -right-6 bg-white text-slate-800 p-4 rounded-xl shadow-xl font-bold flex items-center gap-2"
            >
              <span className="text-emerald-500 text-2xl">98%</span> Trust Score
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}