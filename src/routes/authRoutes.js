// routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * Route to create a new user account.
 * @name POST /api/auth/signup
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post('/signup', authController.signup);

/**
 * Route to log in to an existing user account and receive an access token.
 * @name POST /api/auth/login
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post('/login', authController.login);

module.exports = router;
