// user model
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          msg: 'Username must only contain letters and numbers.',
        },
        len: {
          args: [3, 30],
          msg: 'Username must be between 3 and 30 characters.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be between 6 and 100 characters.',
        },
      },
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        // Hash the password before creating the user
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        // Hash the password before updating the user
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });
  
  User.associate = function(models) { 	
    // User.hasMany(models.Note, {
    //                 foreignKey: "user_id",
    //                 as: "notes",
    //                 constraints: false,
    //               })	
    User.belongsToMany(models.Note, { through: models.NoteUser, as: 'sharedNotes', foreignKey: 'user_id' });

  }

  return User;
}
