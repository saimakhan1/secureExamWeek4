import Link from "next/link";

export default function FreeVideosPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight mb-2 flex items-center gap-3">
            <span className="text-4xl text-red-500">▶</span> Free Video Tutorials
          </h1>
          <p className="text-gray-500 text-lg">
            Watch expert instructors cover the basics of Web Development.
          </p>
        </div>

        <Link 
          href="/dashboard/student/online-courses"
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition shadow-sm"
        >
          ← Back to Resources
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video 1 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
            <iframe 
              className="w-full aspect-video" 
              src="https://www.youtube.com/embed/mU6anWqZJcc" 
              title="HTML & CSS Full Course" 
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm line-clamp-2">HTML & CSS Full Course - Beginner to Pro</h4>
              <p className="text-gray-500 text-xs mt-1">SuperSimpleDev</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
            <iframe 
              className="w-full aspect-video" 
              src="https://www.youtube.com/embed/W6NZfCO5SIk" 
              title="JavaScript Tutorial for Beginners" 
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm line-clamp-2">JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour</h4>
              <p className="text-gray-500 text-xs mt-1">Programming with Mosh</p>
            </div>
          </div>

          {/* Video 3 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
            <iframe 
              className="w-full aspect-video" 
              src="https://www.youtube.com/embed/SqcY0GlETPk" 
              title="React Tutorial for Beginners" 
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm line-clamp-2">React Tutorial for Beginners</h4>
              <p className="text-gray-500 text-xs mt-1">Programming with Mosh</p>
            </div>
          </div>

          {/* Video 4 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
            <iframe 
              className="w-full aspect-video" 
              src="https://www.youtube.com/embed/Oe421EPjeBE" 
              title="Node.js and Express.js - Full Course" 
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm line-clamp-2">Node.js and Express.js - Full Course</h4>
              <p className="text-gray-500 text-xs mt-1">freeCodeCamp.org</p>
            </div>
          </div>

          {/* Video 5 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
            <iframe 
              className="w-full aspect-video" 
              src="https://www.youtube.com/embed/3m3j-0d3j-U" 
              title="Tailwind CSS Full Course" 
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm line-clamp-2">Tailwind CSS Full Course</h4>
              <p className="text-gray-500 text-xs mt-1">Developedbyed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
