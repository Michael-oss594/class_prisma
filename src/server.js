require ('dotenv').config ();
const app = require ('./app.js');
const redisClient = require('./lib/redis');

const PORT = process.env.PORT || 3000;

// Wait for Redis to connect before starting server
(async () => {
  try {
    // Give Redis a moment to connect
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    app.listen (PORT, () => {
      console.log (`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();