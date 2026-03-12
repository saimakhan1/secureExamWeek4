"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, Mail, Shield } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    instructorId: "",
    department: "",
  });

  useEffect(() => {
    if (formData.role === "student") {
      fetchInstructors();
    } else {
      setInstructors([]);
    }
  }, [formData.role]);

  // ✅ API call with role filter
  const fetchInstructors = async () => {
    try {
      console.log("📡 Fetching instructors with role filter...");

      // ✅ API call with role parameter
      const response = await axios.get("/api/admin/users?role=instructor");

      console.log("✅ API Response:", response.data);

      if (response.data.success) {
        const instructorsList = response.data.users;
        console.log(`👨‍🏫 Found ${instructorsList.length} instructors`);
        setInstructors(instructorsList);

        if (instructorsList.length === 0) {
          toast.error("No instructors found. Please add instructors first.");
        }
      }
    } catch (error) {
      console.error("❌ Error fetching instructors:", error);
      toast.error("Could not load instructors list");
      setInstructors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    if (formData.role === "student" && !formData.instructorId) {
      toast.error("Please select an instructor for this student");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/admin/users", formData);

      if (response.data.success) {
        toast.success(response.data.message || "User created successfully!");
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/admin/users"
          className="p-2 hover:bg-gray-200 rounded-xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Add New User
        </h1>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "admin",
                    label: "Admin",
                    icon: "👑",
                    color: "purple",
                  },
                  {
                    value: "instructor",
                    label: "Instructor",
                    icon: "📚",
                    color: "blue",
                  },
                  {
                    value: "student",
                    label: "Student",
                    icon: "🎓",
                    color: "green",
                  },
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        role: role.value,
                        instructorId: "",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition ${
                      formData.role === role.value
                        ? `border-${role.color}-500 bg-${role.color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{role.icon}</div>
                    <div
                      className={`text-sm font-medium ${
                        formData.role === role.value
                          ? `text-${role.color}-700`
                          : "text-gray-600"
                      }`}
                    >
                      {role.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {formData.role === "student" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Instructor <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.instructorId}
                  onChange={(e) =>
                    setFormData({ ...formData, instructorId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
                  required
                >
                  <option value="">Select an instructor</option>
                  {instructors.length > 0 ? (
                    instructors.map((inst) => (
                      <option key={inst._id} value={inst._id}>
                        {inst.name}{" "}
                        {inst.department ? `- ${inst.department}` : ""}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading instructors...</option>
                  )}
                </select>
                {instructors.length === 0 && (
                  <p className="text-sm text-amber-600 mt-1">
                    ⚠️ No instructors found. Please add instructors first.
                  </p>
                )}
              </div>
            )}

            {/* Department (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department (Optional)
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white px-4 py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create User
                  </>
                )}
              </button>
              <Link
                href="/dashboard/admin/users"
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition text-center"
              >
                Cancel
              </Link>
            </div>

            {/* ✅ Info message about default password */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">ℹ️ Note:</span> New users can
                login with default password{" "}
                <span className="font-mono bg-white px-2 py-1 rounded border border-blue-200">
                  Default@123
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
