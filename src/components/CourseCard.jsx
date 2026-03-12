"use client";

export default function CourseCard({ course, onBuyNow }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Course Image */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">📚</div>
          <p className="text-white text-sm">{course.category || "Course"}</p>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-3 mb-6">
          {/* Instructor */}
          {course.instructor && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
          )}

          {/* Lessons/Duration */}
          {course.lessons && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Lessons:</span> {course.lessons}
            </p>
          )}

          {/* Rating */}
          {course.rating && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Rating:</span> ⭐ {course.rating}/5
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#0D7C66]">
              ${(course.price / 100).toFixed(2)}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${(course.originalPrice / 100).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={() => onBuyNow(course)}
          className="w-full py-3 bg-[#0D7C66] text-white font-semibold rounded-lg hover:bg-[#0a5d50] transition-colors duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
