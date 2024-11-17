import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("Connected to MongoDB");
  } catch (e) {
    throw new Error("cannot connect to database");
  }
}

async function disconnectFromDatabse() {
  try {
    await mongoose.disconnect();
  } catch (e) {
    throw new Error("Cannot disconnect");
  }
}

export { connectToDatabase, disconnectFromDatabse };
