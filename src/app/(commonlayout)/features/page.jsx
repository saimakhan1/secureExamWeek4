"use client";

export default function FeaturesPage() {
  const features = [
    {
      title: "Secure Online Exams",
      description:
        "Advanced anti-cheating mechanisms, browser monitoring, and timed assessments for secure exam environments.",
    },
    {
      title: "Role-Based Dashboards",
      description:
        "Separate dashboards for Students, Teachers, and Admins with customized features and access control.",
    },
    {
      title: "Question Bank Management",
      description:
        "Organize questions by subject, topic, and difficulty. Shuffle questions automatically per student.",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Track performance, question-wise accuracy, and export detailed reports instantly.",
    },
    {
      title: "Automated Certificates",
      description:
        "Generate professional PDF certificates automatically after successful exam completion.",
    },
    {
      title: "Smart Scheduling",
      description:
        "Schedule exams for specific groups or make them open to all students with precise timing control.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-[#0D7C66] text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Powerful Features for Modern Online Exams
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          SecureExam provides a complete digital examination ecosystem for
          students, teachers, and institutions.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#41B3A2]"
            >
              <div className="p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#BDE8CA] to-[#D7C3F1] text-[#0D7C66] font-bold text-lg mb-4">
                  {index + 1}
                </div>

                <h2 className="text-xl font-semibold text-[#0D7C66] mb-2">
                  {feature.title}
                </h2>

                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Highlight Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "For Students",
              description:
                "Take exams securely, track results, download certificates, and monitor performance progress.",
            },
            {
              title: "For Teachers",
              description:
                "Create exams, manage question banks, schedule assessments, and analyze student performance.",
            },
            {
              title: "For Admins",
              description:
                "Manage users, control exams, oversee analytics, and maintain platform-wide performance.",
            },
          ].map((role, index) => (
            <div
              key={index}
              className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#41B3A2]"
            >
              <h3 className="text-xl font-bold text-[#0D7C66] mb-4">
                {role.title}
              </h3>
              <p className="text-gray-600">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Ready to Transform Your Examination System?
        </h2>

        <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Get Started Now
        </button>
      </section>
    </div>
  );
}
