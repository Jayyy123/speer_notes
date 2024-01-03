// config/config.js

require('dotenv').config();

/**
 * @typedef {Object} DBConfig
 * @property {string} username - Database username
 * @property {string} password - Database password
 * @property {string} database - Database name
 * @property {string} host - Database host
 * @property {number} port - Database port
 * @property {string} dialect - Database dialect (e.g., postgres)
 */

/**
 * Database configuration based on the environment.
 * @type {{development: DBConfig}}
 */
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  // Add configurations for other environments (e.g., testing, production) if needed
};
