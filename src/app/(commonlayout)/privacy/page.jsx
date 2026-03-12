"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Privacy Policy
        </h1>

        <section className="space-y-6 text-gray-800">
          <p>
            At <span className="font-semibold text-secondary">SecureExam</span>,
            we value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold text-primary">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide when registering, such as your
            name, email address, and role (student, teacher, admin). We also
            collect data on exam activity, login history, and device information
            to ensure security and proper functioning of the platform.
          </p>

          <h2 className="text-2xl font-semibold text-primary">
            2. How We Use Your Information
          </h2>
          <p>Your information is used to:</p>
          <ul className="list-disc list-inside ml-6 text-gray-700">
            <li>Enable login and account management</li>
            <li>Monitor exams and prevent cheating</li>
            <li>Provide analytics and results to instructors and admins</li>
            <li>Improve platform performance and user experience</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary">
            3. Data Sharing
          </h2>
          <p>
            We do not sell or share your personal information with third
            parties, except when required by law or to trusted service providers
            who help us run the platform securely.
          </p>

          <h2 className="text-2xl font-semibold text-primary">4. Security</h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your data against unauthorized access, alteration, or
            disclosure. However, no system is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-primary">
            5. Your Rights
          </h2>
          <p>
            You can request access to your personal data, correct inaccuracies,
            or request deletion by contacting our support team at
            <span className="text-secondary font-medium">
              {" "}
              support@secureexam.com
            </span>
            .
          </p>

          <h2 className="text-2xl font-semibold text-primary">
            6. Changes to this Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use
            of SecureExam constitutes acceptance of any changes.
          </p>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Last updated: February 2026
          </p>
        </section>
      </main>
    </div>
  );
}
