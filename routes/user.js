const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

router.use(verifyToken);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee_id
 *             properties:
 *               employee_id:
 *                 type: string
 *                 example: EMP-10234
 *               role_id:
 *                 type: string
 *                 example: uuid-role-id
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or invalid role
 */
router.post('/', userController.createUser);


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all active users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of active users (password not included)
 */
router.get('/', userController.getUsers);


/**
 * @swagger
 * /api/users/{user_id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: User details (password not included)
 *       404:
 *         description: User not found
 */
router.get('/:user_id', userController.getUserById);


/**
 * @swagger
 * /api/users/{user_id}:
 *   put:
 *     summary: Update user role or activation status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *                 example: uuid-role-id
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:user_id', userController.updateUser);


/**
 * @swagger
 * /api/users/{user_id}:
 *   delete:
 *     summary: Deactivate a user (Soft delete)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       404:
 *         description: User not found
 */
router.delete('/:user_id', userController.deleteUser);


/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee_id
 *             properties:
 *               employee_id:
 *                 type: string
 *                 example: EMP-10234
 *     responses:
 *       200:
 *         description: Password reset token generated
 *       404:
 *         description: User not found
 */
router.post('/reset-password', userController.requestPasswordReset);


/**
 * @swagger
 * /api/users/reset-password/confirm:
 *   post:
 *     summary: Reset password using token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password/confirm', userController.resetPassword);

module.exports = router;
