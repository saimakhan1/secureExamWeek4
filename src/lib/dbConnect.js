import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add Mongo URI");
}

client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

clientPromise = client.connect();

export async function getCollection(collectionName) {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName).collection(collectionName);
}
