const redisClient = require("./redis");

// Cache user data for 1 hour (3600 seconds)
const CACHE_TTL = 3600;

const cacheUser = async (userId, userData) => {
  try {
    await redisClient.setEx(
      `user:${userId}`,
      CACHE_TTL,
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error("Cache error:", error);
  }
};

const getCachedUser = async (userId) => {
  try {
    const cached = await redisClient.get(`user:${userId}`);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Cache error:", error);
    return null;
  }
};

const invalidateUserCache = async (userId) => {
  try {
    await redisClient.del(`user:${userId}`);
  } catch (error) {
    console.error("Cache error:", error);
  }
};

module.exports = {
  cacheUser,
  getCachedUser,
  invalidateUserCache,
};
