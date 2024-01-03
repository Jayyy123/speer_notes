// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { User, Note } = require('./models');  // Import Sequelize models
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authenticationMiddleware = require('./middleware/authentication');
const rateLimitingMiddleware = require('./middleware/rateLimiting');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rateLimitingMiddleware); // Apply rate limiting middleware to all routes
app.use(authenticationMiddleware); // Apply authentication middleware to all routes

app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/notes', noteRoutes); // Routes for notes
app.use('/api/search', searchRoutes); // Routes for searching notes

const PORT = process.env.PORT || 4040;

// Sync the database and start the server
(async () => {
  try {
    await User.sync(); // Sync the User model with the database
    await Note.sync(); // Sync the Note model with the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

module.exports = { app };