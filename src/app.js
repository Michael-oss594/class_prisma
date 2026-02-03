const express = require ('express');
const helmet = require ('helmet');
const morgan = require ('morgan');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const rateLimiter = require ('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const { responseHandler } = require('./middleware/responseHandler');
require ('dotenv').config ();


const app = express ();


// Middleware
app.use (helmet ());
app.use (morgan ('combined'));
app.use (cors ());
app.use (bodyParser.json ());



// Rate Limiter
const limiter = rateLimiter ({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use (limiter);  

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

// Response helper middleware
app.use(responseHandler);

// Mount user routes
const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

// Error handler (after routes)
app.use (errorHandler);

module.exports = app;
