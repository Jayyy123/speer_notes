// controllers/noteController.js

const { Note, User, NoteUser } = require('../models');
/**
 * Get a list of all notes for the authenticated user.
 * @name getAllNotes
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ 
      where: { user_id: req.user.id },
      include: [{ model: User, as: 'sharedUsers' }],
     });
     const shared = await User.findOne({ id: req.user.id, include: [{ model: Note, as: 'sharedNotes' }] });
     const sharedNotes = shared?.sharedNotes ?? [];
    res.status(200).json({error:false,notes, shareNotes:sharedNotes});
  } catch (error) {
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

/**
 * Get a note by ID for the authenticated user.
 * @name getNoteById
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    const shared = await User.findOne({ id: req.user.id, include: [{ model: Note, where:{
      id: req.params.id
    } ,as: 'sharedNotes' }] });
    if (!note && !shared) {
      return res.status(404).json({error:true, message: 'Note not found' });
    }else if(shared){
      const sharedNotes = shared?.sharedNotes ?? [];
      return res.status(200).json({error:false,note:sharedNotes});
    }else{
      return res.status(200).json({error:false,note});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

/**
 * Create a new note for the authenticated user.
 * @name createNote
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if(!title || !content){
      return res.status(400).json({error:true, message: 'Title and content are required' });
    }
    const newNote = await Note.create({ title, content, user_id: req.user.id });
    res.status(201).json({error:false,newNote});
  } catch (error) {
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

/**
 * Update an existing note by ID for the authenticated user.
 * @name updateNote
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [updatedRows] = await Note.update(
      { title, content },
      { where: { id: req.params.id, user_id: req.user.id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error:true,message: 'Note not found' });
    }

    res.status(200).json({error:false, message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

/**
 * Delete a note by ID for the authenticated user.
 * @name deleteNote
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const deleteNote = async (req, res) => {
  try {
    const deletedRows = await Note.destroy({ where: { id: req.params.id, user_id: req.user.id } });

    if (deletedRows === 0) {
      return res.status(404).json({error:true, message: 'Note not found' });
    }

    res.status(200).json({error:false, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

/**
 * Share a note with another user for the authenticated user.
 * @name shareNote
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const shareNote = async (req, res) => {
  try {
    const { username } = req.body;
    const sharedUser = await User.findOne({ where: { username } });

    if (!sharedUser) {
      return res.status(404).json({error:true, message: 'User not found' });
    }

    const note = await Note.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: User, as: 'sharedUsers' }],
    });

    if (!note) {
      return res.status(404).json({error:true, message: 'Note not found' });
    }


    await note.addSharedUsers(sharedUser);
    res.status(200).json({error:false, message: 'Note shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
};
