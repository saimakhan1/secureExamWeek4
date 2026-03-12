import {
  FiUserPlus,
  FiUploadCloud,
  FiMonitor,
  FiCheckCircle,
} from "react-icons/fi";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <FiUserPlus size={28} />,
      title: "Create Account",
      description:
        "Students, teachers, and admins can securely register and access their personalized dashboard.",
    },
    {
      icon: <FiUploadCloud size={28} />,
      title: "Create or Join Exam",
      description:
        "Teachers create exams from the question bank while students can easily join scheduled exams.",
    },
    {
      icon: <FiMonitor size={28} />,
      title: "Secure Examination",
      description:
        "Advanced monitoring, randomized questions, and time tracking ensure a fair exam environment.",
    },
    {
      icon: <FiCheckCircle size={28} />,
      title: "Instant Results",
      description:
        "Automatic grading system provides instant results and performance insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      {/* Header */}
      <div className="text-center py-20 px-6 bg-[#0D7C66] text-white">
        <h1 className="text-4xl font-bold mb-4">How SecureExam Works</h1>
        <p className="text-base-content/70 max-w-2xl mx-auto text-white">
          SecureExam simplifies the online examination process for students,
          teachers, and institutions with a secure and reliable platform.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-lg hover:shadow-xl transition"
          >
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 text-primary p-4 rounded-xl">
                {step.icon}
              </div>
              <h2 className="card-title mt-3">{step.title}</h2>
              <p className="text-sm text-base-content/70">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to start using SecureExam?
        </h2>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
}
