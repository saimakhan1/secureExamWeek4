"use client";

import { ShieldCheck, Lock, EyeOff, UserCheck, Server } from "lucide-react";

/**
 * ======================================
 * SecureExam BRAND COLOR (LOCKED)
 * ======================================
 */
const BRAND_GREEN = "#0D7C66";

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden">
      {/* Brand Glow (same green, opacity only) */}
      <div
        className="absolute -top-36 -left-36 w-[320px] h-[320px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: BRAND_GREEN }}
      />
      <div
        className="absolute -bottom-36 -right-36 w-[320px] h-[320px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: BRAND_GREEN }}
      />

      {/* ================= HERO ================= */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16">
        <div className="animate-float">
          <ShieldCheck
            size={92}
            style={{ color: BRAND_GREEN }}
            className="drop-shadow-[0_8px_18px_rgba(13,124,102,0.25)]"
          />
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND_GREEN}, ${BRAND_GREEN})`,
            }}
          >
            SecureExam Security
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600 text-lg">
          SecureExam is engineered with strict access control, protected
          sessions, and tamper-resistant exam workflows to ensure fairness and
          trust.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <SecurityCard
          icon={<Lock />}
          title="Encrypted Exam Data"
          description="All exams, results, and credentials are securely stored and transmitted."
          color={BRAND_GREEN}
        />

        <SecurityCard
          icon={<UserCheck />}
          title="Role-Based Access Control"
          description="Students, instructors, and admins only access authorized resources."
          color={BRAND_GREEN}
        />

        <SecurityCard
          icon={<EyeOff />}
          title="Question Confidentiality"
          description="Questions remain inaccessible until the exam officially begins."
          color={BRAND_GREEN}
        />

        <SecurityCard
          icon={<Server />}
          title="Protected Infrastructure"
          description="Secure APIs, verified sessions, and controlled database access."
          color={BRAND_GREEN}
        />

        <SecurityCard
          icon={<ShieldCheck />}
          title="Session Integrity"
          description="Authenticated sessions prevent unauthorized platform usage."
          color={BRAND_GREEN}
        />

        <SecurityCard
          icon={<Lock />}
          title="Tamper-Proof Results"
          description="Exam submissions and evaluations cannot be modified unlawfully."
          color={BRAND_GREEN}
        />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 text-center text-slate-500 text-sm pb-10">
        © {new Date().getFullYear()} SecureExam · Secure • Fair • Reliable
      </footer>

      {/* ================= ANIMATION ================= */}
      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ================= CARD ================= */
function SecurityCard({ icon, title, description, color }) {
  return (
    <div
      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border"
      style={{
        borderColor: "rgba(13,124,102,0.25)",
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition group-hover:scale-110"
        style={{
          backgroundColor: "rgba(13,124,102,0.12)",
          color: color,
        }}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>

      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
