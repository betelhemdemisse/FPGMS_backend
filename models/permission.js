'use strict';

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    resource: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },

    action: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },

    description: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Permissions',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['resource', 'action']  
      }
    ]
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      foreignKey: 'permission_id',
      otherKey: 'role_id',
    });
  };

  return Permission;
};
