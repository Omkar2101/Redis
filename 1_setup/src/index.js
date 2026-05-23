import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379/");
const mongodb = mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/chai_aur_redis",
);

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({ message: reply });
});

app.get("/mongodb", async (req, res) => {
  const reply = await mongodb.then(() => "Connected to MongoDB");
  res.json({ message: reply, database: mongoose.connection.db.databaseName });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
