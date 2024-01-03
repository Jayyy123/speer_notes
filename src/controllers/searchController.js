// controllers/searchController.js

const { Note } = require('../models');
const { Op } = require('sequelize');

/**
 * SearchNotes controller searches for notes based on keywords for the authenticated user.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const searchNotes = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({error:true, message: 'Search query parameter is missing' });
    }

    const notes = await Note.findAll({
      where: {
        user_id: req.user.id,
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    res.status(200).json({
      error:false,
      notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

module.exports = { searchNotes };
