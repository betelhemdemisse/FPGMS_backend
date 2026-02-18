'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      role_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  },
};
