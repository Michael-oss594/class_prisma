require("dotenv").config();
const redis = require("redis");

let redisClient;
let isConnecting = false;

const initializeRedis = async () => {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (isConnecting) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (redisClient && redisClient.isOpen) {
          clearInterval(checkInterval);
          resolve(redisClient);
        }
      }, 100);
    });
  }

  isConnecting = true;

  try {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    console.log("Connecting to Redis...");

    redisClient = redis.createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error("Redis reconnection failed after 10 attempts");
            return new Error("Redis max retries exceeded");
          }
          return retries * 100;
        },
      },
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis Client Error:", err.message);
    });

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });

    redisClient.on("ready", () => {
      console.log("✅ Redis client is ready");
    });

    redisClient.on("reconnecting", () => {
      console.log("🔄 Reconnecting to Redis...");
    });

    await redisClient.connect();
    isConnecting = false;
    return redisClient;
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error.message);
    isConnecting = false;
    throw error;
  }
};

// Initialize connection
initializeRedis().catch((err) => {
  console.error("Redis initialization error:", err);
});

const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
};

module.exports = redisClient || getRedisClient();

