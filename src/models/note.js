
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty.',
        },
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters.',
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [1, 2000],
          msg: 'Content must be less than or equal to 2000 characters.',
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    }
  });

  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    Note.belongsToMany(models.User, {
      through: models.NoteUser,
      as: 'sharedUsers',
      foreignKey: 'note_id'
    });
  }

  return Note;
}
