"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    role: "", // ডিফল্টভাবে খালি করে দেওয়া হলো
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contactdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#00a96e",
        });
        
        // সাবমিট হওয়ার পর রোল আবার খালি করে দেওয়া হলো
        setFormData({ name: "", role: "", email: "", subject: "", message: "" });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.error || "Failed to send message.",
          icon: "error",
          confirmButtonColor: "#ff5861",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ff5861",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 mt-10">Get in Touch</h1>
        <p className="text-base-content/70">
          Have questions about{" "}
          <span className="text-primary font-semibold">SecureExam</span>? We are
          here to help.
        </p>
      </div>

      {/* Contact Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-base-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-primary to-teal-400 text-white p-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-8 text-white/90">
            Fill out the form and our Team AlphaDevs will get back to you within
            24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiPhone className="text-xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm opacity-90">+8801306979918</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-90">
                  malam2331103@bscse.uiu.ac.bd
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin className="text-xl" />
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-sm opacity-90">
                  Team AlphaDevs HQ <br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <p className="mt-16 text-sm opacity-80">
            © 2026 SecureExam by AlphaDevs. All rights reserved.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-10 bg-base-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">I am a..</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className="select select-bordered w-full"
                  required // এটি যুক্ত করা হয়েছে যাতে রোল সিলেক্ট না করে সাবমিট করা না যায়
                >
                  {/* ডিফল্ট অপশন যুক্ত করা হয়েছে */}
                  <option value="" disabled>Select your role</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Exam Issue / Technical Support"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-28"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"} <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}