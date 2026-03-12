"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function LearnerResources() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleNavigation = (path) => {
    if (session) {
      router.push(path);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <section className="relative py-24 bg-emerald-950 overflow-hidden border-y border-emerald-800/40">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            Elevate Your Skills
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Explore Learning{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Resources
            </span>
          </h2>
          <p className="text-lg text-emerald-100/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to succeed. Browse our free community materials,
            expert premium courses, or get certified to elevate your career.
          </p>
        </motion.div>

        {/* Resources Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[160px] lg:auto-rows-[200px]"
        >
          {/* Card 1: Free Resources (Spans 1 Column, 2 Rows) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            onClick={() => handleNavigation("/dashboard/student/online-courses/free-resources")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/50 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-colors duration-500 md:row-span-2 h-full"
          >
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/60 transition-colors duration-500 z-10"></div>
            <Image
              src="https://i.ibb.co.com/Bpbj3Tn/free-resource.avif"
              alt="Free Resources"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-overlay opacity-80 group-hover:opacity-100"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Free Resources
              </h3>
              <p className="text-emerald-300 font-bold tracking-wider uppercase text-sm drop-shadow-md">
                View Materials
              </p>
            </div>
            {/* Always Visible Default Label ( fades out on hover ) */}
            <div className="absolute bottom-8 left-8 z-20 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-3xl font-bold text-white shadow-2xl bg-emerald-950/60 px-5 py-2.5 rounded-xl backdrop-blur-md border border-emerald-800/50">
                Free Resources
              </h3>
            </div>
          </motion.div>

          {/* Card 2: Premium Courses (Spans 1 Row, 1 Column) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            onClick={() => handleNavigation("/dashboard/student/online-courses/premium-courses")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/50 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-colors duration-500 h-full"
          >
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/60 transition-colors duration-500 z-10"></div>
            <Image
              src="https://i.ibb.co.com/pBx3Ffh2/premium.jpg"
              alt="Premium Courses"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-overlay opacity-80 group-hover:opacity-100"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Premium Courses
              </h3>
              <p className="text-emerald-300 font-bold tracking-wider uppercase text-sm drop-shadow-md">
                Browse Catalog
              </p>
            </div>
            {/* Always Visible Default Label */}
            <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-2xl font-bold text-white shadow-2xl bg-emerald-950/60 px-4 py-2 rounded-xl backdrop-blur-md border border-emerald-800/50">
                Premium Courses
              </h3>
            </div>
          </motion.div>

          {/* Card 3: Certificate Exams (Spans 1 Row, 1 Column) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            onClick={() => handleNavigation("/dashboard/student/online-courses/certification-exams")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/50 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-colors duration-500 h-full"
          >
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/60 transition-colors duration-500 z-10"></div>
            <Image
              src="https://i.ibb.co.com/VYjcTqSc/study-certificate.webp"
              alt="Certificate Exams"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-overlay opacity-80 group-hover:opacity-100"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Certificate Exams
              </h3>
              <p className="text-emerald-300 font-bold tracking-wider uppercase text-sm drop-shadow-md">
                Get Certified
              </p>
            </div>
            {/* Always Visible Default Label */}
            <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-2xl font-bold text-white shadow-2xl bg-emerald-950/60 px-4 py-2 rounded-xl backdrop-blur-md border border-emerald-800/50">
                Certificate Exams
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}