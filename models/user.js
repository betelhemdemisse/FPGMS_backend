'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

 employee_id: {
  type: DataTypes.UUID,
  allowNull: false,
  unique: true,
  validate: {
    isUUID: 4,
  },
},


    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    resetToken: {
      type: DataTypes.STRING,
    },

    resetTokenExpiry: {
      type: DataTypes.DATE,
    },

    mustResetPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  }, {
    tableName: 'Users',
    timestamps: true,

    defaultScope: {
      attributes: {
        exclude: ['password', 'resetToken', 'resetTokenExpiry'],
      },
    },

    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT_ROUNDS) || 10
      );
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT_ROUNDS) || 10
      );
    }
  });

  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };


  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
  };

  return User;
};
