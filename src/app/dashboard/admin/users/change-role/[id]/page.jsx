"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, AlertCircle, User, Mail, Ban } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangeRolePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [newRole, setNewRole] = useState("");

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
        setUser(response.data.user);
        setNewRole(response.data.user.role);
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

    if (newRole === user.role) {
      toast.error("New role must be different from current role");
      return;
    }

    // ✅ Check if user is student and trying to become instructor only
    if (user.role === "student" && newRole !== "instructor") {
      toast.error("Students can only be promoted to Instructor");
      return;
    }

    // ✅ Block other role changes
    if (user.role !== "student") {
      toast.error("Role change is only allowed for students");
      return;
    }

    setUpdating(true);

    try {
      const response = await axios.put(
        `/api/admin/users/change-role/${userId}`,
        {
          newRole,
        },
      );

      if (response.data.success) {
        toast.success(`Student promoted to Instructor successfully`);
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.response?.data?.error || "Failed to update role");
    } finally {
      setUpdating(false);
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

  if (!user) {
    return null;
  }

  const getRoleIcon = (role) => {
    const icons = {
      admin: "👑",
      instructor: "📚",
      student: "🎓",
    };
    return icons[role] || "👤";
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "purple",
      instructor: "blue",
      student: "green",
    };
    return colors[role] || "gray";
  };

  // ✅ Check if role change is allowed for this user
  const isRoleChangeAllowed = user.role === "student";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/admin/users"
          className="p-2 hover:bg-gray-200 rounded-xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {isRoleChangeAllowed
            ? "Promote Student to Instructor"
            : "Role Change Not Allowed"}
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            User Information
          </h2>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
            <div className="w-10 h-10 rounded-full bg-[#0D7C66] flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Current Role</p>
              <div
                className={`flex items-center gap-2 text-${getRoleColor(user.role)}-600`}
              >
                <span className="text-xl">{getRoleIcon(user.role)}</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Department</p>
              <p className="font-medium">
                {user.department || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Change Role Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#0D7C66]" />
            <h2 className="text-lg font-semibold text-gray-800">
              {isRoleChangeAllowed
                ? "Promote to Instructor"
                : "Role Change Restricted"}
            </h2>
          </div>

          {!isRoleChangeAllowed ? (
            // ✅ Message for non-students
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <div className="flex gap-3">
                <Ban className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">
                    Role Change Not Allowed
                  </h3>
                  <p className="text-sm text-red-600">
                    This user is a <strong>{user.role}</strong>. Role changes
                    are only allowed for
                    <strong> students</strong> to be promoted to{" "}
                    <strong>instructor</strong>.
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    • Admins cannot change roles
                  </p>
                  <p className="text-sm text-red-600">
                    • Instructors cannot be demoted to students
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // ✅ Student promotion form
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-700">
                    <strong>Student Promotion:</strong> This student can be
                    promoted to Instructor. Only Instructor role is available.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {/* Only show Instructor option for students */}
                <button
                  type="button"
                  onClick={() => setNewRole("instructor")}
                  className={`p-4 rounded-xl border-2 transition ${
                    newRole === "instructor"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div className="text-left">
                      <div className="font-medium">Instructor</div>
                      <div className="text-sm text-gray-500">
                        Promote student to instructor role
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {newRole !== user.role && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium mb-1">Warning: Role Change</p>
                      <p>
                        Promoting this student to Instructor will give them
                        instructor privileges including creating exams and
                        managing students.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updating || newRole === user.role}
                  className="flex-1 bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white px-4 py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Promote to Instructor
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
          )}

          {/* Back button for non-students */}
          {!isRoleChangeAllowed && (
            <div className="mt-4">
              <Link
                href="/dashboard/admin/users"
                className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Back to Users List
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
