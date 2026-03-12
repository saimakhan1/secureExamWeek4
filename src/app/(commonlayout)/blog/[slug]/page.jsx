"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="bg-gray-900 min-h-screen text-gray-300 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl text-primary font-bold">Post Not Found</h1>
          <Link href="/blog" className="text-green-500 hover:text-green-700">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-green-500 hover:text-green-700">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mt-4 mb-6">
          {post.title}
        </h1>
        <div className="text-gray-400 text-lg whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </main>
  );
}
