'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      permission_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      resource: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      action: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.addConstraint('Permissions', {
      fields: ['resource', 'action'],
      type: 'unique',
      name: 'unique_resource_action'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permissions');
  },
};
