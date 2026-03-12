"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Terms of Service
        </h1>

        <section className="space-y-6 text-gray-800">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-secondary">SecureExam</span>. By
            using our platform, you agree to comply with and be bound by the
            following terms and conditions of use.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6">
            1. Use of Platform
          </h2>
          <p>
            <span className="text-secondary font-medium">SecureExam</span> is
            provided to facilitate online examinations in a secure and
            controlled environment. You may not use the platform for any
            unlawful or unauthorized purpose.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6">
            2. User Accounts
          </h2>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials. Any activity under your account is your
            responsibility.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6">
            3. Prohibited Conduct
          </h2>
          <p>
            You may not attempt to bypass the security measures of the platform,
            share exam content, or interfere with other users’ sessions.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6">
            4. Disclaimer
          </h2>
          <p>
            <span className="text-secondary font-medium">SecureExam</span> is
            provided “as is” without warranties of any kind. While we aim to
            maintain uptime and security, we are not responsible for exam
            disruptions caused by user devices or internet connectivity.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6">
            5. Modifications
          </h2>
          <p>
            SecureExam may update these terms at any time. Continued use of the
            platform constitutes acceptance of any changes.
          </p>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Last updated: February 2026
          </p>
        </section>
      </main>
    </div>
  );
}
