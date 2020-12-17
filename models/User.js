const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define(
    'user',
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          is: /^\w{3,}$/,
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
          min: 5,
        },
      },
    },
    {
      hooks: {
        beforeValidate: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
      getterMethods: {
        getSignedJWTtoken() {
          return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });
        },
      },
    }
  );
};
