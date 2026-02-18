const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */
router.use(verifyToken);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Role already exists
 */
router.post('/', roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get('/', roleController.getRoles);

/**
 * @swagger
 * /api/roles/{role_id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the role
 *     responses:
 *       200:
 *         description: Role details
 *       404:
 *         description: Role not found
 */
router.get('/:role_id', roleController.getRoleById);

/**
 * @swagger
 * /api/roles/{role_id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
router.put('/:role_id', roleController.updateRole);

/**
 * @swagger
 * /api/roles/{role_id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:role_id', roleController.deleteRole);

module.exports = router;
