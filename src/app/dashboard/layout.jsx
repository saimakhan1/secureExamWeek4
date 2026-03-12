"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, isMobileMenuOpen]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Helper to apply active class
  const linkClass = (href) =>
    `block px-3 py-2 rounded-lg transition-colors duration-200 ${
      pathname === href
        ? "bg-white text-[#0D7C66] font-semibold"
        : "text-white hover:bg-[#41B3A2] hover:text-white"
    }`;

  // Mobile menu link class
  const mobileLinkClass = (href) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
      pathname === href
        ? "bg-white text-[#0D7C66] font-semibold"
        : "text-white hover:bg-[#41B3A2]"
    }`;

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile topbar (Visible only on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D7C66] text-white flex items-center justify-between px-4 z-40">
        <h2 className="text-xl font-bold">SecureExam</h2>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={menuRef}
        className={`fixed inset-y-0 left-0 w-64 bg-secondary text-white p-4 flex flex-col justify-between z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-16 lg:mt-6">
          <h2 className="text-2xl font-bold mb-6 hidden lg:block">
            SecureExam
          </h2>

          <nav className="flex flex-col gap-2 overflow-y-auto max-h-[70vh] custom-scrollbar">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>

            <Link
              href="/dashboard/profile"
              className={mobileLinkClass("/dashboard/profile")}
            >
              <span>Profile</span>
              <ChevronRight className="w-4 h-4 lg:hidden" />
            </Link>

            {/* ADMIN Links */}
            {session.user.role === "admin" && (
              <>
                <Link
                  href="/dashboard/admin/users"
                  className={mobileLinkClass("/dashboard/admin/users")}
                >
                  <span>Active Users</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/admin/deleted-users"
                  className={mobileLinkClass("/dashboard/admin/deleted-users")}
                >
                  <span>Deleted Users</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/admin/reports"
                  className={mobileLinkClass("/dashboard/admin/reports")}
                >
                  <span>Reports</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/admin/analytics"
                  className={linkClass("/dashboard/admin/analytics")}
                >
                  <span>Analytics</span>
                </Link>
              </>
            )}

            {/* INSTRUCTOR Links */}
            {session.user.role === "instructor" && (
              <>
                <Link
                  href="/dashboard/instructor/create-batch"
                  className={mobileLinkClass(
                    "/dashboard/instructor/create-batch",
                  )}
                >
                  <span>Create Batch</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/view-batches"
                  className={mobileLinkClass(
                    "/dashboard/instructor/view-batches",
                  )}
                >
                  <span>View Batches</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/add-students"
                  className={mobileLinkClass(
                    "/dashboard/instructor/add-students",
                  )}
                >
                  <span>Add Students</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/create-exam"
                  className={mobileLinkClass(
                    "/dashboard/instructor/create-exam",
                  )}
                >
                  <span>Create Exam</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/question-bank"
                  className={mobileLinkClass(
                    "/dashboard/instructor/question-bank",
                  )}
                >
                  <span>Question Bank</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/exam-list"
                  className={mobileLinkClass("/dashboard/instructor/exam-list")}
                >
                  <span>List of Exams</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/theory-submissions"
                  className={mobileLinkClass(
                    "/dashboard/instructor/theory-submissions",
                  )}
                >
                  <span>Theory Submissions</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/instructor/analytics"
                  className={mobileLinkClass("/dashboard/instructor/analytics")}
                >
                  <span>Analytics</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
              </>
            )}

            {/* STUDENT Links */}
            {session.user.role === "student" && (
              <>
                <Link
                  href="/dashboard/student/my-exams"
                  className={mobileLinkClass("/dashboard/student/my-exams")}
                >
                  <span>My Exams</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/student/result"
                  className={mobileLinkClass("/dashboard/student/result")}
                >
                  <span>Results</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/student/notifications"
                  className={mobileLinkClass(
                    "/dashboard/student/notifications",
                  )}
                >
                  <span>Notifications</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/student/online-courses"
                  className={mobileLinkClass(
                    "/dashboard/student/online-courses",
                  )}
                >
                  <span>Online Courses & Exams</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/student/payment-history"
                  className={mobileLinkClass(
                    "/dashboard/student/payment-history",
                  )}
                >
                  <span>Payment History</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
                <Link
                  href="/dashboard/student/awards"
                  className={mobileLinkClass("/dashboard/student/awards")}
                >
                  <span>Awards</span>
                  <ChevronRight className="w-4 h-4 lg:hidden" />
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-red-600 font-medium hover:bg-red-50 transition"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-16 lg:pt-0">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
