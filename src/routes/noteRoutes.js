// routes/noteRoutes.js

const express = require('express');
const noteController = require('../controllers/noteController');
const authenticateJWT = require('../middleware/authentication');

const router = express.Router();

router.use(authenticateJWT); // Apply authentication middleware to all routes below

/**
 * Route to get a list of all notes for the authenticated user.
 * @name GET /api/notes
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.get('/', noteController.getAllNotes);

/**
 * Route to get a note by ID for the authenticated user.
 * @name GET /api/notes/:id
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.get('/:id', noteController.getNoteById);

/**
 * Route to create a new note for the authenticated user.
 * @name POST /api/notes
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post('/', noteController.createNote);

/**
 * Route to update an existing note by ID for the authenticated user.
 * @name PUT /api/notes/:id
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.put('/:id', noteController.updateNote);

/**
 * Route to delete a note by ID for the authenticated user.
 * @name DELETE /api/notes/:id
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.delete('/:id', noteController.deleteNote);

/**
 * Route to share a note with another user for the authenticated user.
 * @name POST /api/notes/:id/share
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post('/:id/share', noteController.shareNote);

module.exports = router;
