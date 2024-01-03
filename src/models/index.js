// models/index.js

const { Sequelize } = require('sequelize');
const config = require('../config/config');
const UserModel = require('./user');
const NoteModel = require('./note');
const NoteUser = require('./noteUser');

/**
 * @typedef {Object} DBModels
 * @property {Model} User - Sequelize model for User
 * @property {Model} Note - Sequelize model for Note
 * @property {Model} NoteUser - Sequelize model for NoteUser
 */

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
// force sync otherwise it should create automatically if not exist
// sequelize.sync({ force: true });
/**
 * Sequelize models for the application.
 * @type {DBModels}
 */
const db = {
  User: UserModel(sequelize, Sequelize),
  Note: NoteModel(sequelize, Sequelize),
  NoteUser: NoteUser(sequelize, Sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
