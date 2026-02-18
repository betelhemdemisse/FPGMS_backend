'use strict';

module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define(
    'RolePermissions',
    {
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'RolePermissions',
      timestamps: true,
    }
  );

  return RolePermissions;
};
