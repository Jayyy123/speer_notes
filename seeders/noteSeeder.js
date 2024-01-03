const bcrypt = require('bcrypt');
const { User } = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed your users here
    const hashedPassword = await bcrypt.hash('password123', 10);

    await User.bulkCreate([
      { username: 'user1', password: hashedPassword },
      { username: 'user2', password: hashedPassword },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded users
    await User.destroy({ where: {} });
  },
};
