"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, Mail, Shield } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    isActive: true,
  });

  useEffect(() => {
    if (userId) {
      fetchUser();
    } else {
      toast.error("Invalid user ID");
      router.push("/dashboard/admin/users");
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching user with ID:", userId);

      const response = await axios.get(`/api/admin/users/${userId}`);
      console.log("✅ User data:", response.data);

      if (response.data.success) {
        const user = response.data.user;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "student",
          department: user.department || "",
          isActive: user.isActive !== false,
        });
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.response?.data?.error || "Failed to load user");
      setTimeout(() => router.push("/dashboard/admin/users"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(`/api/admin/users/${userId}`, {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        isActive: formData.isActive,
      });

      if (response.data.success) {
        toast.success("User updated successfully");
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error(error.response?.data?.error || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
        <p className="ml-2 text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/admin/users"
          className="p-2 hover:bg-gray-200 rounded-xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Edit User
        </h1>
      </div>

      {/* Edit Form */}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
                  required
                />
              </div>
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <select
                value={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === "true",
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Role Display (Read Only) */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="px-3 py-1 bg-[#0D7C66]/10 text-[#0D7C66] rounded-full text-sm font-medium capitalize">
                  {formData.role}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                To change role, use Change Role page
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white px-4 py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
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
          </form>
        </div>
      </div>
    </div>
  );
}
