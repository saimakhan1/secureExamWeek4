import { getCollection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getCollection("courses");
    
    // Fetch all courses
    const courses = await db
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray();

    if (!courses) {
      return NextResponse.json(
        { courses: [] },
        { status: 200 }
      );
    }

    // Format courses data
    const formattedCourses = courses.map(course => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price || 0,
      originalPrice: course.originalPrice,
      category: course.category,
      instructor: course.instructor,
      lessons: course.lessons || 0,
      rating: course.rating || 0,
      image: course.image,
      duration: course.duration,
      level: course.level,
    }));

    return NextResponse.json(
      { courses: formattedCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
