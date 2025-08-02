import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is missing in .env file");
    }

    await connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Cannot Connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log("✅ MongoDB Disconnected");
  } catch (error) {
    console.error("❌ MongoDB Disconnection Error:", error);
    throw new Error("Cannot Disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
