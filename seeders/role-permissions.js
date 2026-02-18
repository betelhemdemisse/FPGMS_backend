'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [adminRoleResult] = await queryInterface.sequelize.query(
      `SELECT role_id FROM "Roles" WHERE name = 'admin' LIMIT 1;`
    );

    if (!adminRoleResult.length) return;

    const adminRoleId = adminRoleResult[0].role_id;

    const [permissionsResult] = await queryInterface.sequelize.query(
      `SELECT permission_id FROM "Permissions";`
    );

    if (!permissionsResult.length) return;

    const rolePermissions = permissionsResult.map((p) => ({
      role_id: adminRoleId,
      permission_id: p.permission_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('RolePermissions', rolePermissions, {});
  },

  async down(queryInterface, Sequelize) {
    const [adminRoleResult] = await queryInterface.sequelize.query(
      `SELECT role_id FROM "Roles" WHERE name = 'admin' LIMIT 1;`
    );

    if (adminRoleResult.length) {
      await queryInterface.bulkDelete('RolePermissions', { role_id: adminRoleResult[0].role_id }, {});
    }
  },
};
