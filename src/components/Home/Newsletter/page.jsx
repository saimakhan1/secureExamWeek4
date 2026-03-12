"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  // Framer Motion 
  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } }
  };

  return (
    <section className="bg-base-100 py-20 px-6 md:px-12 lg:px-24 w-full min-h-[70vh] flex items-center justify-center font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Left Side: Illustration */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} 
        >
          
          <img 
            src="https://i.ibb.co.com/BVNg33mY/newsletter-img-2048x1738.webp" 
            alt="Newsletter Envelop Illustration" 
            className="w-full max-w-[400px] lg:max-w-[500px] object-contain drop-shadow-sm"
          />
        </motion.div>

        {/* Right Side: Content & Form */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-start"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Subheading */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-[2px] bg-gray-400"></div>
            <p className="text-sm font-semibold tracking-[0.2em] text-[#144b36] uppercase">
              Subscribe
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-[36px] md:text-[46px] lg:text-[52px] font-extrabold text-[#1f2937] mb-6 leading-[1.2]">
            Sign Up <span className="text-[#144b36] underline decoration-[#144b36] decoration-[5px] underline-offset-[10px]">Our</span> <span className="text-[#144b36] underline decoration-[#144b36] decoration-[5px] underline-offset-[10px]">NewsLetter</span>
          </h2>

          {/* Meaningful English Description */}
          <p className="text-[#4b5563] text-base md:text-lg mb-8 leading-[1.8] max-w-[550px]">
            Stay updated with our latest insights, case studies, and exclusive 
            offers delivered directly to your inbox. We respect your privacy and 
            will never share your email.
          </p>

          {/* Animated Input Form */}
          <motion.form 
            className="w-full max-w-[550px] relative mb-4"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-[#144b36]">
              <input 
                type="email" 
                placeholder="Enter Your Email Id" 
                className="flex-1 bg-transparent px-5 py-3.5 outline-none text-[#374151] placeholder-gray-400 w-full text-base"
                required
              />
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-[#144b36] hover:bg-[#0f3a29] text-white px-8 py-3.5 rounded-md font-medium transition-colors duration-300 shadow-md whitespace-nowrap text-base"
              >
                Submit
              </motion.button>
            </div>
          </motion.form>

          {/* Privacy Note */}
          <p className="text-[#6b7280] text-sm mt-3 font-medium">
            We respect your privacy, Unsubscribe at anytime.
          </p>

        </motion.div>
      </div>
    </section>
  );
}