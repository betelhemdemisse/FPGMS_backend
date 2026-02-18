'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'user_id' },
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Roles', key: 'role_id' },
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

    await queryInterface.addConstraint('UserRoles', {
      fields: ['user_id', 'role_id'],
      type: 'primary key',
      name: 'userroles_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRoles');
  },
};
