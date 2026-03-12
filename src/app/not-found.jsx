import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="text-center max-w-xl">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/10">
            <FiAlertTriangle className="text-5xl text-primary" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-bold text-primary mb-2">404 !</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold mb-3">Not Found</h2>

        <p className="text-base-content/70 mb-8">
          Oops! The page you are trying to access does not exist in the
          SecureExam system.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>

          <Link href="/dashboard" className="btn btn-outline btn-primary">
            Back to Dashboard
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-10 text-sm text-base-content/60">
          SecureExam • Online Examination Platform
        </p>
      </div>
    </div>
  );
}
