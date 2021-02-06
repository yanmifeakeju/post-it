const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('groupMembers', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.user, // 'Movies' would also work
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.group, // 'Actors' would also work
        key: 'id',
      },
    },
  });
};
