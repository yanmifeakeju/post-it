const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'group',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
};
