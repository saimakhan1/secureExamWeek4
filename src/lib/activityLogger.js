import { getCollection } from "./dbConnect";

/**
 * Activity Logger Function
 * This function logs user activities to the database
 */
export async function logActivity({
  userId,
  userName,
  userEmail,
  userRole,
  action,
  details,
  metadata = {},
}) {
  try {
    // Get the activity_logs collection
    const activityCollection = await getCollection("activity_logs");

    // Create activity log entry
    const activityLog = {
      userId,
      userName,
      userEmail,
      userRole,
      action,
      details,
      metadata,
      timestamp: new Date(),
    };

    // Insert into database
    const result = await activityCollection.insertOne(activityLog);

    console.log(`Activity logged: ${action} - ${userName}`);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error("Error logging activity:", error);
    return { success: false, error: error.message };
  }
}
