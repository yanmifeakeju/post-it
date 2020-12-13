const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('message', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
