"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaRegCommentDots, FaAward } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";

const stats = [
  {
    id: 1,
    icon: FaBookOpen,
    value: "70M",
    description: "Exams and assessments successfully delivered to students worldwide.",
  },
  {
    id: 2,
    icon: FaRegCommentDots,
    value: "9/10",
    description: "Average satisfaction rating from educators and learners globally.",
  },
  {
    id: 3,
    icon: FiMonitor,
    value: "95%",
    description: "System uptime and reliability, ensuring uninterrupted learning sessions.",
  },
  {
    id: 4,
    icon: FaAward,
    value: "40K",
    description: "Certified educators and expert mentors actively guiding our community.",
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

export default function AboutSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images & Video Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-6 sm:mt-12 w-full sm:w-1/2">
              <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-lg h-72 lg:h-80">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
                  alt="Business Woman"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Mentors Card */}
              <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User 3" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=4" alt="User 4" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-900 flex items-center justify-center text-white text-xs font-bold z-10">
                    +67
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Top-Mentors</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Around The Globe</p>
                </div>
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 w-full sm:w-1/2">
              {/* Video Box (Our Story) */}
              <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-lg h-64 lg:h-72 group">
                {/* Free placeholder video for demo */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-5">
                  <h3 className="text-white font-semibold tracking-wide">Our Story</h3>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-lg h-64 lg:h-72">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {/* Subheading */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-gray-400"></span>
              <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                Flexible Supported Learning
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Expertise Across{" "}
              <span className="text-emerald-900 underline decoration-emerald-800 decoration-4 underline-offset-8">
                All Disciplines
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-gray-600 leading-relaxed mb-10 max-w-xl">
              We provide a comprehensive, secure, and user-friendly platform designed to adapt to your unique learning and assessment needs. Whether you are conducting large-scale exams or upgrading your skills, our cutting-edge technology ensures a seamless experience every step of the way.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-10">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <stat.icon className="text-3xl text-gray-700" />
                    <h3 className="text-4xl font-extrabold text-emerald-900 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div>
              <button className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium px-8 py-3.5 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}