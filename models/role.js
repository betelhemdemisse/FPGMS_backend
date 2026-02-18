'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
  }, {
    tableName: 'Roles',
    timestamps: true,
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      foreignKey: 'role_id',
      otherKey: 'user_id',
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      foreignKey: 'role_id',
      otherKey: 'permission_id',
    });
  };

  return Role;
};
