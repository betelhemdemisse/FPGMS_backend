'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    'UserRoles',
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'UserRoles',
      timestamps: true,
    }
  );

  return UserRoles;
};
