import React from "react";
import Image from "next/image";
import { IoShieldCheckmark, IoStatsChart } from "react-icons/io5";
import { FaUsers, FaLightbulb } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import Link from "next/link";
export default function AboutSction() {
  return (
    <div className=" ">
      {/* hero section */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-br from-[#f0f9f4] via-[#e6f3ff] to-[#f3e8ff] text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
          About SecureExam
        </h1>

        <p className="mt-6 text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          SecureExam is a modern online examination platform designed to ensure
          security, fairness, and automation for institutions, coaching centers,
          and online educators.
        </p>
      </section>
      {/* mission section */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src="/images/heroimg.jpg"
              alt="Mission Image"
              width={400}
              height={400}
              className=""
              priority
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
              Our Mission
            </h2>

            <p className="text-gray-600 text-sm sm:text-base">
              Our mission is to build a trusted digital examination environment
              where institutions can conduct exams securely without compromising
              fairness.
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              We focus on automation, smart monitoring, and instant evaluation
              systems to improve academic efficiency.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#BDE8CA]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
            Why Choose SecureExam?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#41B3A2]/20 flex flex-col items-center gap-4">
              <IoShieldCheckmark size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">
                Secure Proctoring
              </h3>
              <p className="text-gray-600 mt-1 text-sm text-center">
                AI powered proctoring logs ensure fairness and prevent cheating.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#41B3A2]/20 flex flex-col items-center gap-4">
              <IoStatsChart size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">
                Instant Evaluation
              </h3>
              <p className="text-gray-600 mt-1 text-sm text-center">
                Automatic grading system reduces manual workload.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#41B3A2]/20 flex flex-col items-center gap-4">
              <FaUsers size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">
                Scalable Platform
              </h3>
              <p className="text-gray-600 mt-1 text-sm text-center">
                Handle thousands of students simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center gap-4 p-6">
              <FaLightbulb size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">
                Innovation
              </h3>
              <p className="text-gray-600 text-sm text-center">
                Continuous improvement with modern technologies.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6">
              <HiOutlineAcademicCap size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">Learning</h3>
              <p className="text-gray-600 text-sm text-center">
                Education-focused platform for students and instructors.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6">
              <FaUsers size={40} className="text-[#0D7C66]" />
              <h3 className="text-lg font-semibold text-[#0D7C66]">
                Reliability
              </h3>
              <p className="text-gray-600 text-sm text-center">
                Stable system with high uptime and security.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="mt-2 text-white/90">Active Students</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="mt-2 text-white/90">Exams Conducted</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">98%</h3>
            <p className="mt-2 text-white/90">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
            Meet Our Team
          </h2>
          <p className="mt-4 text-gray-700 mb-10">
            Professionals dedicated to making exams fair and efficient.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/arzoo.png"
                  alt="Arzoo Ahmed"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Arzu Ahmed</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>

            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/sadia.png"
                  alt="Sadia Rahman"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Sadia Rahman</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>

            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/saima.png"
                  alt="Saima Khan"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Saima Khan</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>

            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/ehasun.png"
                  alt="Ehasun Ul Islam"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Ehasun Ul Islam</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>

            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/abir.png"
                  alt="Abir"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Arafat Alam Abir</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>

            <div className="flex flex-col items-center bg-[#BDE8CA] rounded-xl p-6 shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <Image
                  src="/images/nimmy.png"
                  alt="Nimmy"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h4 className="font-bold text-[#0D7C66]">Jannatul Bakia</h4>
              <p className="text-gray-600 text-sm text-center">Web Developer</p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-gray-700">
              <p className="italic">
                "SecureExam simplified our online exams completely."
              </p>
              <h4 className="mt-4 font-bold text-[#0D7C66]">
                University Admin
              </h4>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-gray-700">
              <p className="italic">"AI proctoring is amazing and accurate!"</p>
              <h4 className="mt-4 font-bold text-[#0D7C66]">Instructor</h4>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-gray-700">
              <p className="italic">
                "Our students feel safe and the exams are fair."
              </p>
              <h4 className="mt-4 font-bold text-[#0D7C66]">Student</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D7C66]">
            FAQs
          </h2>

          <div className="mt-12 space-y-4 text-left">
            <details className="p-4 border rounded-lg shadow-sm">
              <summary className="cursor-pointer font-semibold text-[#0D7C66]">
                Is SecureExam safe?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, we use AI proctoring and secure data encryption.
              </p>
            </details>

            <details className="p-4 border rounded-lg shadow-sm">
              <summary className="cursor-pointer font-semibold text-[#0D7C66]">
                Can I start a free trial?
              </summary>
              <p className="mt-2 text-gray-600">
                Absolutely, click on Get Started to begin your trial.
              </p>
            </details>

            <details className="p-4 border rounded-lg shadow-sm">
              <summary className="cursor-pointer font-semibold text-[#0D7C66]">
                Does it support large exams?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, SecureExam can handle thousands of students simultaneously.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-br from-[#0D7C66] via-[#41B3A2] to-[#BDE8CA] text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to Transform Your Exam System?
        </h2>

        <p className="mt-4 text-white/90">
          Join SecureExam and experience secure & automated online testing.
        </p>

        <Link
          href="#"
          className="inline-block mt-8 px-8 py-3 bg-white text-[#0D7C66] font-semibold rounded-lg hover:shadow-xl transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
