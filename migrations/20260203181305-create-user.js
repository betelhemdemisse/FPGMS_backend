'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {

      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      // 🔥 HR System UUID
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      resetTokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      mustResetPassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
