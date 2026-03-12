import Link from "next/link";

export default function FreeResourcesPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Free Resources</h1>
          <p className="text-gray-500 text-lg">
            Explore exactly what you need.
          </p>
        </div>

        <Link 
          href="/dashboard/student/online-courses"
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition shadow-sm"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
            <span className="text-3xl">📚</span> 
            Free Learning Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Getting Started Guides</h3>
            <p className="text-gray-500 text-sm">Step-by-step guides for absolute beginners.</p>
          </a>
          <Link 
            href="/dashboard/student/online-courses/free-videos"
            className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer border-blue-200 bg-blue-50/30 block"
          >
            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
              <span className="text-red-500">▶</span> Free Video Tutorials
            </h3>
            <p className="text-gray-500 text-sm">Watch expert instructors cover the basics of Web Development.</p>
          </Link>
          <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Practice Worksheets</h3>
            <p className="text-gray-500 text-sm">Downloadable PDFs with exercises and answers.</p>
          </a>
          <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Community Forum</h3>
            <p className="text-gray-500 text-sm">Connect with peers and mentors for free support.</p>
          </a>
        </div>
      </div>
    </main>
  );
}
