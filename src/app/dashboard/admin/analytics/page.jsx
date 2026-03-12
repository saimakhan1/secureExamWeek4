"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  ShoppingCart,
  Award,
  Activity,
  UserCheck,
  Calendar,
  UserPlus,
  LogIn,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  const [activitiesByType, setActivitiesByType] = useState({
    registrations: [],
    logins: [],
    purchases: [],
    counts: { total: 0, registrations: 0, logins: 0, purchases: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("week"); // "week" or "month"

  // Fetch data when timeFilter changes
  useEffect(() => {
    fetchAllData();
  }, [timeFilter]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log(`📡 Fetching data with filter: ${timeFilter}`);

      const [statsRes, activitiesRes, revenueRes, activitiesByTypeRes] =
        await Promise.all([
          axios.get("/api/admin/analytics/stats"),
          axios.get("/api/admin/analytics/activities"),
          axios.get(`/api/admin/analytics/revenue?period=${timeFilter}`),
          axios.get("/api/admin/analytics/activities-by-type"),
        ]);

      setStats(statsRes.data.data);
      setActivities(activitiesRes.data.activities);
      setRevenueData(revenueRes.data.data);
      setActivitiesByType(activitiesByTypeRes.data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0D7C66",
        titleColor: "white",
        bodyColor: "white",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e2e8f0" },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: timeFilter === "week" ? 7 : 10,
        },
      },
    },
    elements: {
      line: { tension: 0.3 },
      point: { radius: 3, hoverRadius: 6 },
    },
  };

  const chartData = {
    labels: revenueData?.labels || [],
    datasets: [
      {
        label: "Revenue",
        data: revenueData?.values || [],
        borderColor: "#0D7C66",
        backgroundColor: "rgba(13, 124, 102, 0.1)",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "#0D7C66",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };

  // Format timestamp
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Get action icon
  const getActionIcon = (action) => {
    switch (action) {
      case "purchased_course":
        return "🛒";
      case "joined_platform":
        return "🎉";
      case "logged_in":
        return "🔓";
      default:
        return "📌";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0D7C66] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
      {/* Header with Time Filter */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              📊 Analytics Dashboard
            </h1>
            <p className="text-white/80 mt-1">
              Real-time overview of your platform
            </p>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setTimeFilter("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                timeFilter === "week"
                  ? "bg-white text-[#0D7C66]"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                timeFilter === "month"
                  ? "bg-white text-[#0D7C66]"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats?.users?.total?.toLocaleString() || "0"}
          subtitle={`+${stats?.users?.newToday || 0} today`}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
          borderColor="border-blue-200"
        />
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value={stats?.courses?.total?.toLocaleString() || "0"}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
          borderColor="border-purple-200"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${stats?.payments?.totalRevenue || "0"}`}
          subtitle={`$${stats?.payments?.todayRevenue || "0"} today`}
          bgColor="bg-green-50"
          iconColor="text-green-600"
          borderColor="border-green-200"
        />
        <StatCard
          icon={Activity}
          title="Active Today"
          value={stats?.activity?.activeToday?.toLocaleString() || "0"}
          bgColor="bg-orange-50"
          iconColor="text-orange-600"
          borderColor="border-orange-200"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0D7C66]" />
            Revenue Trend{" "}
            {timeFilter === "week" ? "(Last 7 Days)" : "(Last 30 Days)"}
          </h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {timeFilter === "week" ? "Week View" : "Month View"}
          </div>
        </div>
        <div className="h-80">
          {revenueData && <Line data={chartData} options={chartOptions} />}
        </div>
      </div>

      {/* Activity Sections - 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* New Registrations */}
        <ActivitySection
          router={router} // ✅ router prop পাঠাচ্ছি
          icon={UserPlus}
          title="New Registrations"
          count={activitiesByType.counts.registrations}
          activities={activitiesByType.registrations}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
          type="registrations"
        />

        {/* Recent Logins */}
        <ActivitySection
          router={router}
          icon={LogIn}
          title="Recent Logins"
          count={activitiesByType.counts.logins}
          activities={activitiesByType.logins}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
          type="logins"
        />

        {/* Recent Purchases */}
        <ActivitySection
          router={router}
          icon={CreditCard}
          title="Recent Purchases"
          count={activitiesByType.counts.purchases}
          activities={activitiesByType.purchases}
          bgColor="bg-green-100"
          iconColor="text-green-600"
          type="purchases"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#0D7C66]" />
            User Distribution
          </h2>
          <div className="space-y-4">
            <ProgressBar
              label="Students"
              value={stats?.users?.students || 0}
              total={stats?.users?.total || 1}
              color="bg-green-500"
              bgColor="bg-green-100"
            />
            <ProgressBar
              label="Instructors"
              value={stats?.users?.instructors || 0}
              total={stats?.users?.total || 1}
              color="bg-blue-500"
              bgColor="bg-blue-100"
            />
            <ProgressBar
              label="Admins"
              value={stats?.users?.admins || 0}
              total={stats?.users?.total || 1}
              color="bg-purple-500"
              bgColor="bg-purple-100"
            />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#0D7C66]" />
            Payment Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-bold text-gray-800">
                {stats?.payments?.totalTransactions || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Average Transaction</span>
              <span className="font-bold text-[#0D7C66]">
                ${stats?.payments?.averageTransaction || "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#0D7C66]/5 rounded-xl border border-[#0D7C66]/20">
              <span className="font-medium text-[#0D7C66]">
                Today&apos;s Revenue
              </span>
              <span className="font-bold text-xl text-[#0D7C66]">
                ${stats?.payments?.todayRevenue || "0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#0D7C66]" />
          Recent Activities
        </h2>
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((act, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-lg">
                  {getActionIcon(act.action)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      {act.userName}
                    </span>
                    <span className="text-gray-500 mx-1">•</span>
                    <span className="text-gray-600 capitalize">
                      {act.action.replace("_", " ")}
                    </span>
                  </p>
                  <p className="text-sm text-[#0D7C66] font-medium mt-1">
                    {act.details}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(act.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No activities yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  bgColor,
  iconColor,
  borderColor,
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl p-6 shadow-sm border ${borderColor} hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${bgColor} ${iconColor} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ label, value, total, color, bgColor }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">
          {value.toLocaleString()}
        </span>
      </div>
      <div className={`w-full ${bgColor} rounded-full h-2.5`}>
        <div
          className={`${color} rounded-full h-2.5 transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Activity Section Component
function ActivitySection({
  router,
  icon: Icon,
  title,
  count,
  activities,
  bgColor,
  iconColor,
  type,
}) {
  const getActionIcon = (action) => {
    switch (action) {
      case "purchased_course":
        return "🛒";
      case "joined_platform":
        return "🎉";
      case "logged_in":
        return "🔓";
      default:
        return "📌";
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    return `${Math.floor(diffMins / 60)} hour ago`;
  };

  // View All click handler
  const handleViewAll = () => {
    switch (type) {
      case "registrations":
        router.push("/dashboard/admin/analytics/registrations");
        break;
      case "logins":
        router.push("/dashboard/admin/analytics/logins");
        break;
      case "purchases":
        router.push("/dashboard/admin/analytics/purchases");
        break;
      default:
        router.push("/dashboard/admin/analytics/all");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{count} today</p>
          </div>
        </div>
        {/* View All Button */}
        <button
          onClick={handleViewAll}
          className="text-sm text-[#0D7C66] hover:text-[#41B3A2] flex items-center gap-1 transition-colors"
        >
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((act, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-sm">
                {act.userName?.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-gray-800">
                    {act.userName}
                  </span>
                  {type === "purchases" && act.amount && (
                    <span className="text-xs bg-green-100 text-green-700 ml-2 px-2 py-0.5 rounded-full">
                      ${act.amount}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {type === "purchases"
                    ? act.courseName || act.details
                    : act.details}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(act.timestamp)}
                </p>
              </div>
              <div className="text-lg opacity-50">
                {getActionIcon(act.action)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            No {title.toLowerCase()} yet
          </p>
        )}
      </div>
    </div>
  );
}
