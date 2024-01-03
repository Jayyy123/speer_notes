// routes/searchRoutes.js

const express = require('express');
const searchController = require('../controllers/searchController');
const authenticateJWT = require('../middleware/authentication');

const router = express.Router();

router.use(authenticateJWT); // Apply authentication middleware to all routes below

/**
 * Route to search for notes based on keywords for the authenticated user.
 * @name GET /api/search
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.get('/', searchController.searchNotes);

module.exports = router;
