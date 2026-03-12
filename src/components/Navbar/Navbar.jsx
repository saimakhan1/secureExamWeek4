"use client";

import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoShield, IoChevronDown } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  if (status === "loading") return null;

  const profileImage = session?.user?.image || "/default-avatar.png";
  const profileName = session?.user?.name || "User";
  const profileEmail = session?.user?.email || "";

  /* ================= BASE NAV LINKS ================= */
  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Features",
      submenu: [
        { name: "Exam Builder", href: "/features/exam-builder" },
        { name: "Analytics Dashboard", href: "/features/analytics" },
        { name: "Question Bank", href: "/features/question-bank" },
        { name: "Notifications", href: "/features/notifications" },
        { name: "Integrations", href: "/features/integrations" },
      ],
    },
    {
      name: "How It Works",
      submenu: [
        { name: "For Students", href: "/how-it-works/for-students" },
        { name: "For Instructors", href: "/how-it-works/instructors" },
        { name: "Security Measures", href: "/how-it-works/security" },
        { name: "Reporting & Analytics", href: "/how-it-works/reporting" },
      ],
    },
    {
      name: "Pricing",
      submenu: [
        { name: "Free Plan", href: "/pricing/free" },
        { name: "Starter Plan", href: "/pricing/starter" },
        { name: "Pro Plan", href: "/pricing/pro" },
        { name: "Enterprise Plan", href: "/pricing/enterprise" },
      ],
    },
    {
      name: "Resources",
      submenu: [
        { name: "Documentation", href: "/resources/docs" },
        { name: "Tutorials", href: "/resources/tutorials" },
        { name: "API Reference", href: "/resources/api" },
      ],
    },
    {
      name: "Community",
      submenu: [
        { name: "Forum", href: "/community/forum" },
        { name: "Events", href: "/community/events" },
        { name: "Blog", href: "/community/blog" },
      ],
    },
    {
      name: "Support",
      submenu: [
        { name: "Contact Us", href: "/support/contact" },
        { name: "FAQ", href: "/support/faq" },
        { name: "Report Issue", href: "/support/report" },
      ],
    },
  ];

  const dashboardHref = "/dashboard";

  /* ================= DESKTOP NAV ================= */
  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => {
        const isSingleActive = pathname === link.href;
        const isDropdownActive = link.submenu?.some((sub) =>
          pathname.startsWith(sub.href)
        );
        const isActive = isSingleActive || isDropdownActive;

        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`font-medium transition-all duration-300 ${
                  isActive
                    ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                    : "text-emerald-100/70 hover:text-emerald-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li
            key={link.name}
            className="dropdown dropdown-hover dropdown-bottom"
          >
            <div
              tabIndex={0}
              role="button"
              className={`flex items-center gap-1 font-medium transition-colors bg-transparent border-none m-0 p-2 ${
                isActive
                  ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  : "text-emerald-100/70 hover:text-emerald-300"
              }`}
            >
              {link.name}
              <IoChevronDown size={14} className={`transition-transform ${isActive ? "text-emerald-400" : ""}`} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-emerald-900/95 backdrop-blur-xl rounded-xl w-56 border border-emerald-700/50"
            >
              {link.submenu.map((sub) => {
                const isSubActive = pathname.startsWith(sub.href);
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`rounded-lg transition-colors py-2.5 ${
                        isSubActive
                          ? "bg-emerald-800/60 text-emerald-300 font-semibold"
                          : "text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
      
      {/* ✅ DASHBOARD (ONLY WHEN LOGGED IN) */}
      {session && (
        <li>
          <Link
            href={dashboardHref}
            className={`px-4 py-2 rounded-xl transition-all font-medium border ${
              pathname.startsWith("/dashboard")
                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-emerald-900/40 border-emerald-700/50 text-emerald-300 hover:bg-emerald-800 hover:border-emerald-500"
            }`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  /* ================= MOBILE NAV ================= */
  const renderMobileNavLinks = () => (
    <>
      {navLinks.map((link) => {
        const isSingleActive = pathname === link.href;
        const isDropdownActive = link.submenu?.some((sub) =>
          pathname.startsWith(sub.href)
        );
        const isActive = isSingleActive || isDropdownActive;

        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`font-medium block py-2 ${
                  isActive ? "text-emerald-400" : "text-emerald-100/80"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.name}>
            <details className="group">
              <summary
                className={`font-medium py-2 cursor-pointer ${
                  isActive ? "text-emerald-400" : "text-emerald-100/80"
                }`}
              >
                {link.name}
              </summary>
              <ul className="ml-4 border-l border-emerald-800 mt-2 pl-2 space-y-1">
                {link.submenu.map((sub) => {
                  const isSubActive = pathname.startsWith(sub.href);
                  return (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        className={`block py-1.5 px-2 rounded-lg ${
                          isSubActive
                            ? "bg-emerald-800/50 text-emerald-300"
                            : "text-emerald-100/60 hover:text-emerald-200"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        );
      })}
      
      {/* ✅ DASHBOARD (ONLY WHEN LOGGED IN) */}
      {session && (
        <li>
          <Link
            href={dashboardHref}
            className="mt-4 block text-center py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 font-bold"
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col pt-[4.5rem]">
        {/* Main Navbar Wrapper (Completely Fixed Flex Layout) */}
        <div className="w-full fixed top-0 z-50 bg-emerald-950/80 backdrop-blur-xl px-4 lg:px-8 border-b border-emerald-800/40 shadow-sm transition-all flex items-center justify-between min-h-[4.5rem]">
          
          {/* 1. START: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-white group"
            >
              <IoShield size={28} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              SecureExam
            </Link>
          </div>

          {/* 2. CENTER: Desktop Links */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <ul className="flex items-center justify-center gap-5 xl:gap-8 list-none m-0 p-0">
              {renderNavLinks()}
            </ul>
          </div>

          {/* 3. END: Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* --- Auth / Profile (Desktop Only) --- */}
            <div className="hidden lg:flex items-center gap-3">
              {session ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar hover:bg-transparent"
                  >
                    <div className="w-10 rounded-full border-2 border-emerald-500/30 hover:border-emerald-400 transition-colors shadow-sm">
                      <img src={profileImage} alt="Profile" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-50 p-2 shadow-xl menu menu-sm dropdown-content bg-emerald-900/95 backdrop-blur-xl rounded-xl w-56 border border-emerald-700/50"
                  >
                    <li className="px-4 py-3 pointer-events-none">
                      <p className="font-bold text-white text-base block">{profileName}</p>
                      <span className="text-xs text-emerald-200/60 truncate block mt-0.5">
                        {profileEmail}
                      </span>
                    </li>
                    <div className="h-[1px] bg-emerald-800/50 w-full my-1"></div>
                    <li>
                      <Link href={dashboardHref} className="hover:bg-emerald-800/60 hover:text-emerald-300 text-emerald-100 py-2">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 hover:text-red-300 py-2 mt-1">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="font-medium text-emerald-100/80 hover:text-emerald-300 px-4 py-2 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/registration"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* --- Mobile Menu Toggle Button --- */}
            <div className="lg:hidden flex items-center">
              <label
                htmlFor="mobile-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-emerald-100 hover:bg-emerald-800/50"
              >
                <HiBars3BottomLeft size={30} />
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar (Unchanged) */}
      <div className="drawer-side z-[60]">
        <label
          htmlFor="mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-6 w-80 min-h-full bg-emerald-950 text-emerald-100 flex flex-col gap-2 border-r border-emerald-800/50">
          
          {/* Mobile Header */}
          <div className="flex items-center gap-2 font-bold text-2xl mb-6 pb-4 border-b border-emerald-800/50 text-white">
            <IoShield size={28} className="text-emerald-400" />
            SecureExam
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto">
            <ul className="list-none p-0 m-0">
               {renderMobileNavLinks()}
            </ul>
          </div>

          {/* Mobile Auth/Dashboard Buttons */}
          <div className="mt-auto pt-6 border-t border-emerald-800/50 flex flex-col gap-3">
            {session ? (
              <>
                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/50">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-emerald-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm text-white truncate">{profileName}</p>
                    <p className="text-xs text-emerald-200/60 truncate">
                      {profileEmail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-3 rounded-xl font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="py-3 rounded-xl text-center font-semibold text-emerald-300 bg-emerald-900/40 border border-emerald-700/50 hover:bg-emerald-800/60 transition-colors w-full"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/registration"
                  className="py-3 rounded-xl text-center font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors w-full shadow-lg shadow-emerald-900/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}