// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * SignUp controller creates a new user account.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const signup = async (req, res) => {
  try {
    const { username, password, email, ...names } = req.body;
    console.log(username, password);
    // Hash the password before saving it to the database
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ username, password, email, ...names  });

    res.status(201).json({error:false, message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Handle Sequelize validation errors
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({error:true, errors: validationErrors });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint errors (e.g., duplicate username or email)
      res.status(400).json({error:true, message: 'Username or email is already in use.' });
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({error:true, message: 'Internal Server Error' });
    }
  }
};

/**
 * Login controller logs in to an existing user account and receives an access token.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error:true, message: 'Invalid username or password' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error:true, message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({error:false, message: 'Login successful', token, user_id: user.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({error:true, message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
