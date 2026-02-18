'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Roles', key: 'role_id' },
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Permissions', key: 'permission_id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addConstraint('RolePermissions', {
      fields: ['role_id', 'permission_id'],
      type: 'primary key',
      name: 'rolepermissions_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions');
  },
};
