function applyExtraSetup(sequelize) {
  const { user, group, message } = sequelize.models;

  user.belongsToMany(group, {
    through: 'members',
    foreignKey: 'userId',
  });

  group.belongsToMany(user, {
    through: 'members',
    foreignKey: 'groupId',
  });

  group.belongsTo(user, {
    foreignKey: 'owner',
  });

  message.belongsTo(group, {
    foreignKey: 'groupId',
  });

  message.belongsTo(user, {
    foreignKey: 'userId',
  });

  // post.belongsTo(group, {
  //   foreignKey: 'groupId',
  // });
}

module.exports = { applyExtraSetup };
