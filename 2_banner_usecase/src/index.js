import express from "express";
import Redis from "ioredis";


const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379/");

//declaring a banner key
const BANNER_KEY = "banner:redis";


//set the banner key with some value
app.post("/banner", async (req, res) => {
  await redis.set(BANNER_KEY, "Welcome to Redis Banner!");
  res.json({ message: "Banner set successfully" });
});

//get the banner value
app.get("/banner", async (req, res) => {
  const banner = await redis.get(BANNER_KEY);
  if (banner) {
    res.json({ banner });
  } else {
    res.json({ message: "No banner found" });
  }
});

//check the key exists or not 
app.get("/banner/exist", async (req, res) => {
  const exists = await redis.exists(BANNER_KEY);
  //exists returns 1 if the key exists and 0 if it does not exist
  res.json({ exists: Boolean(exists) });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
