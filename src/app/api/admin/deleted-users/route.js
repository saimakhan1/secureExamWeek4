import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const role = searchParams.get("role");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    console.log("🔍 Fetching deleted users with params:", {
      page,
      limit,
      role,
      search,
    });

    const deletedUsersCollection = await getCollection("deleted_users");

    // Build query
    let query = {};

    // Role filter
    if (role && role !== "all" && role !== "undefined" && role !== "null") {
      query.role = role;
    }

    // Search filter (name or email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Get total count
    const totalUsers = await deletedUsersCollection.countDocuments(query);

    // Get paginated users
    const users = await deletedUsersCollection
      .find(query)
      .sort({ deletedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Calculate pagination info
    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching deleted users:", error);
    return NextResponse.json(
      { error: "Failed to fetch deleted users" },
      { status: 500 },
    );
  }
}
