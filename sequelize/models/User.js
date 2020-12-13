const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('user', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        // We require usernames to have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{5,}$/,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },

    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 6,
      },
    },
  });
};
