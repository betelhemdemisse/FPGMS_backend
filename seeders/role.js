'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        role_id: uuidv4(),
        name: 'admin',
        description: 'Administrator role with full permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Roles', roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', { name: 'admin' }, {});
  }
};
