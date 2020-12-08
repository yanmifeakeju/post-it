const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Group = sequelize.define('group', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

(async () => {
  await Group.sync({ logging: true });
  console.log('Group model synced'.bgYellow);
})();

module.exports = Group;
