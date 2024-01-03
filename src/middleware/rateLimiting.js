// middleware/rateLimiting.js

const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware to handle high traffic.
 * @type {express.RequestHandler}
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a few minutes',
});

module.exports = limiter;
