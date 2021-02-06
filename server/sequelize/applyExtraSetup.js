function applyExtraSetup(sequelize) {
  const { user, group, groupMembers, message } = sequelize.models;

  user.hasMany(group, {
    foreignKey: {
      allowNull: false,
    },
  });

  group.belongsToMany(user, {
    as: 'GroupMembers',
    through: groupMembers,
    foreignKey: 'groupId',
  });

  user.belongsToMany(group, {
    as: 'MemberGroups',
    through: groupMembers,
    foreignKey: 'userId',
  });

  group.hasMany(message, {
    foreignKey: {
      allowNull: false,
    },
  });

  user.hasMany(message, {
    foreignKey: {
      allowNull: false,
    },
  });

  // groupMembers.hasMany(user);
  // groupMembers.hasMany(group);

  // message.belongsTo(group, {
  //   foreignKey: 'groupId',
  // });

  // message.belongsTo(user, {
  //   foreignKey: 'userId',
  // });

  // post.belongsTo(group, {
  //   foreignKey: 'groupId',
  // });
}

module.exports = { applyExtraSetup };
