// convertExamId.js
import { MongoClient } from "mongodb";

// Replace with your correct Atlas URI
const uri = MONGODB_URI;
const dbName = DBNAME;

async function convertExamIds() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("theoryQuestions");

    const docs = await collection.find().toArray();
    console.log(`Found ${docs.length} documents`);

    for (const doc of docs) {
      await collection.updateOne(
        { _id: doc._id },
        { $set: { examId: doc.examId.toHexString() } }, // <-- convert ObjectId to string
      );
      console.log(`Updated examId for doc _id: ${doc._id}`);
    }

    console.log("✅ All documents updated successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

convertExamIds();
