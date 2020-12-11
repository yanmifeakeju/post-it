const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Group = require('./Group');

const Message = sequelize.define('message', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Message.belongsTo(Group);

(async () => {
  await Message.sync({ logging: true });
  console.log('Message model synced'.bgYellow);
})();

module.exports = Message;
