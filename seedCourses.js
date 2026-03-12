// This file contains sample course data
// Run this in your Node.js environment or manually add courses to MongoDB

import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://secureExamAdmin:aQdLUc0YuYK8Kn6B@cluster0.ldizubn.mongodb.net/?appName=Cluster0";
const DBNAME = "secureexamdb";

const sampleCourses = [
  {
    title: "JavaScript Fundamentals",
    description:
      "Learn the basics of JavaScript programming including variables, functions, and DOM manipulation.",
    price: 2999, // $29.99
    originalPrice: 4999, // $49.99
    category: "Programming",
    instructor: "John Smith",
    lessons: 24,
    rating: 4.8,
    duration: "8 weeks",
    level: "Beginner",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Advanced React Patterns",
    description:
      "Master advanced React concepts like hooks, context API, and performance optimization.",
    price: 3999, // $39.99
    originalPrice: 5999, // $59.99
    category: "Programming",
    instructor: "Sarah Johnson",
    lessons: 32,
    rating: 4.9,
    duration: "10 weeks",
    level: "Advanced",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Python Data Science",
    description:
      "Learn data analysis and visualization with Python using Pandas, NumPy, and Matplotlib.",
    price: 4499, // $44.99
    originalPrice: 6999, // $69.99
    category: "Data Science",
    instructor: "Dr. Mike Chen",
    lessons: 40,
    rating: 4.7,
    duration: "12 weeks",
    level: "Intermediate",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Web Design Masterclass",
    description:
      "Create stunning web designs with HTML, CSS, and modern design principles.",
    price: 3499, // $34.99
    originalPrice: 5499, // $54.99
    category: "Design",
    instructor: "Emily Davis",
    lessons: 28,
    rating: 4.6,
    duration: "9 weeks",
    level: "Beginner",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Complete Node.js Course",
    description:
      "Build scalable backend applications with Node.js, Express, and MongoDB.",
    price: 4999, // $49.99
    originalPrice: 7999, // $79.99
    category: "Programming",
    instructor: "James Wilson",
    lessons: 48,
    rating: 4.8,
    duration: "14 weeks",
    level: "Intermediate",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Digital Marketing Essentials",
    description:
      "Learn SEO, social media marketing, and content strategy for online success.",
    price: 2499, // $24.99
    originalPrice: 3999, // $39.99
    category: "Marketing",
    instructor: "Lisa Anderson",
    lessons: 20,
    rating: 4.5,
    duration: "6 weeks",
    level: "Beginner",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedCourses() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(DBNAME);
    const coursesCollection = db.collection("courses");

    // Clear existing courses (optional)
    // await coursesCollection.deleteMany({});

    // Insert sample courses
    const result = await coursesCollection.insertMany(sampleCourses);

    console.log(`✓ Successfully inserted ${result.insertedCount} sample courses`);
    console.log("Course IDs:", result.insertedIds);
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await client.close();
  }
}

// Uncomment to run
seedCourses();

export { sampleCourses };
