function applyExtraSetup(sequelize) {
  const { user, group, message, post } = sequelize.models;

  user.belongsToMany(group, {
    through: 'member',
    foreignKey: 'userId',
  });

  group.belongsToMany(user, {
    through: 'member',
    foreignKey: 'groupId',
  });

  group.belongsTo(user, {
    foreignKey: 'owner',
  });

  message.belongsTo(post, {
    foreignKey: 'postId',
  });

  message.belongsTo(user, {
    foreignKey: 'userId',
  });

  post.belongsTo(group, {
    foreignKey: 'groupId',
  });
}

module.exports = { applyExtraSetup };
