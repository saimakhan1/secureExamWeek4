"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  RefreshCw,
  Shield,
  GraduationCap,
  Users,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Trash2,
  Archive,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeletedUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // ✅ Count states - সব deleted users থেকে calculate করব
  const [counts, setCounts] = useState({
    total: 0,
    admin: 0,
    instructor: 0,
    student: 0,
  });

  // ✅ Load counts when component mounts
  useEffect(() => {
    fetchCounts();
  }, []);

  // Load users when page, filter, or pageSize changes
  useEffect(() => {
    fetchDeletedUsers();
  }, [currentPage, filter, pageSize, searchTerm]);

  // ✅ আলাদা function for counts
  const fetchCounts = async () => {
    try {
      // সব deleted users নিয়ে আসি (limit 1000 যাতে সব আসে)
      const response = await axios.get("/api/admin/deleted-users?limit=1000");
      const allDeletedUsers = response.data.users;

      setCounts({
        total: allDeletedUsers.length,
        admin: allDeletedUsers.filter((u) => u.role === "admin").length,
        instructor: allDeletedUsers.filter((u) => u.role === "instructor")
          .length,
        student: allDeletedUsers.filter((u) => u.role === "student").length,
      });

      console.log("✅ Counts updated:", {
        total: allDeletedUsers.length,
        admin: allDeletedUsers.filter((u) => u.role === "admin").length,
        instructor: allDeletedUsers.filter((u) => u.role === "instructor")
          .length,
        student: allDeletedUsers.filter((u) => u.role === "student").length,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchDeletedUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/admin/deleted-users", {
        params: {
          page: currentPage,
          limit: pageSize,
          role: filter !== "all" ? filter : undefined,
          search: searchTerm || undefined,
        },
      });

      setUsers(response.data.users);

      // Update pagination info
      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
        setTotalUsers(response.data.pagination.totalUsers);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPrevPage(response.data.pagination.hasPrevPage);
      }
    } catch (error) {
      toast.error("Failed to load deleted users");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to restore ${userName}?`)) {
      try {
        await axios.post(`/api/admin/deleted-users/${userId}`);
        toast.success("User restored successfully");
        // ✅ Restore করার পর counts এবং users দুটোই refresh
        await fetchCounts();
        await fetchDeletedUsers();
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to restore user");
      }
    }
  };

  const handlePermanentDelete = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${userName}? This action cannot be undone!`,
      )
    ) {
      try {
        await axios.delete(`/api/admin/deleted-users/${userId}`);
        toast.success("User permanently deleted");
        // ✅ Permanent delete করার পর counts এবং users refresh
        await fetchCounts();
        await fetchDeletedUsers();
      } catch (error) {
        toast.error("Failed to permanently delete user");
      }
    }
  };

  // Role badge color
  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      instructor: "bg-blue-100 text-blue-800 border-blue-200",
      student: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Handle search with debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // ✅ Refresh both counts and users
  const handleRefresh = () => {
    fetchCounts();
    fetchDeletedUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              🗑️ Deleted Users Archive
            </h1>
            <p className="text-white/80 mt-1">
              Restore or permanently delete archived users
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
          >
            <Users className="w-5 h-5" />
            Back to Active Users
          </Link>
        </div>
      </div>

      {/* Stats Cards - ✅ এখন counts state থেকে দেখাচ্ছে */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          icon={Archive}
          count={counts.total}
          label="Total Deleted"
          color="text-red-600"
          bg="bg-red-100"
        />
        <StatCard
          icon={Shield}
          count={counts.admin}
          label="Admins"
          color="text-purple-600"
          bg="bg-purple-100"
        />
        <StatCard
          icon={GraduationCap}
          count={counts.instructor}
          label="Instructors"
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatCard
          icon={Users}
          count={counts.student}
          label="Students"
          color="text-green-600"
          bg="bg-green-100"
        />
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search deleted users by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2] focus:border-transparent"
            />
          </div>

          {/* Filter Buttons - ✅ counts state থেকে দেখাচ্ছে */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { key: "all", label: "All", count: counts.total },
              { key: "admin", label: "Admin", count: counts.admin },
              {
                key: "instructor",
                label: "Instructor",
                count: counts.instructor,
              },
              { key: "student", label: "Student", count: counts.student },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key);
                  setCurrentPage(1);
                  fetchCounts(); // ✅ counts refresh
                }}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                  filter === f.key
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              title="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Deleted users are stored for 30 days. After
            that, they will be automatically permanently deleted. You can
            restore them anytime within this period.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading deleted users...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Deleted At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Original ID: {user.originalId?.slice(-6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(user.deletedAt).toLocaleDateString()} at{" "}
                        {new Date(user.deletedAt).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          Deleted
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRestore(user._id, user.name)}
                            className="p-2 hover:bg-green-100 rounded-lg transition group"
                            title="Restore User"
                          >
                            <RotateCcw className="w-4 h-4 text-green-600 group-hover:scale-110" />
                          </button>
                          <button
                            onClick={() =>
                              handlePermanentDelete(user._id, user.name)
                            }
                            className="p-2 hover:bg-red-100 rounded-lg transition group"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user._id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(user.deletedAt).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                      Deleted
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => handleRestore(user._id, user.name)}
                      className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(user._id, user.name)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {users.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Archive className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No deleted users found.</p>
                <p className="text-sm mt-1">Deleted users will appear here.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToFirstPage}
            disabled={!hasPrevPage}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="First Page"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToPrevPage}
            disabled={!hasPrevPage}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="px-4 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={goToLastPage}
            disabled={!hasNextPage}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Last Page"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>

        {/* Showing info */}
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} entries
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, count, label, color, bg }) {
  return (
    <div
      className={`${bg} rounded-xl p-4 shadow-sm hover:shadow-md transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs md:text-sm">{label}</p>
          <p className={`text-xl md:text-2xl font-bold ${color}`}>{count}</p>
        </div>
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${color} opacity-80`} />
      </div>
    </div>
  );
}
