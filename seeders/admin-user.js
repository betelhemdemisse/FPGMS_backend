'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {

    const userId = uuidv4();
    const employeeId = uuidv4();

    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    await queryInterface.bulkInsert('Users', [
      {
        user_id: userId,
        employee_id: employeeId,
        password: hashedPassword,
        mustResetPassword: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const [adminRoleResult] = await queryInterface.sequelize.query(
      `SELECT role_id FROM "Roles" WHERE name='admin' LIMIT 1;`
    );

    if (adminRoleResult.length) {
      await queryInterface.bulkInsert('UserRoles', [
        {
          user_id: userId,
          role_id: adminRoleResult[0].role_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
