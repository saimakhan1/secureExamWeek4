"use client";

import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Make Online Exams Secure",
    excerpt:
      "Learn how to prevent cheating, ensure fairness, and secure your online assessments.",
    slug: "5-tips-online-exams-secure",
  },
  {
    id: 2,
    title: "How Automated Grading Works",
    excerpt:
      "Discover the technology behind automatic grading and feedback in online exams.",
    slug: "automated-grading-explained",
  },
  {
    id: 3,
    title: "Advantages of Online Examination Platforms",
    excerpt:
      "Explore why schools and institutions are shifting to digital exams for better efficiency.",
    slug: "advantages-online-exams",
  },
];

export default function BlogPage() {
  return (
    <main className="mt-20  min-h-screen text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-8 text-center">
          SecureExam Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-green-500 hover:text-green-700 font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
