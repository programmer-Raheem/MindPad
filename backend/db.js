const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI; // will be read from Render

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

module.exports = connectToMongo;
