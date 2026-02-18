'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [
      // User CRUD
      { permission_id: uuidv4(), resource: 'user', action: 'create', description: 'Create user', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'user', action: 'read', description: 'Read user', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'user', action: 'update', description: 'Update user', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'user', action: 'delete', description: 'Delete user', createdAt: new Date(), updatedAt: new Date() },

      // Role CRUD
      { permission_id: uuidv4(), resource: 'role', action: 'create', description: 'Create role', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'role', action: 'read', description: 'Read role', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'role', action: 'update', description: 'Update role', createdAt: new Date(), updatedAt: new Date() },
      { permission_id: uuidv4(), resource: 'role', action: 'delete', description: 'Delete role', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Permissions', permissions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
