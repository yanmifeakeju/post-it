const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('post', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
