const { Role, Permission } = require('../models');

// ================= CREATE ROLE =================
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) return res.status(400).json({ error: 'Role already exists' });

    const role = await Role.create({ name, description });
    res.status(201).json({ message: 'Role created successfully', role_id: role.role_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create role' });
  }
};

// ================= GET ALL ROLES =================
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: { model: Permission, through: { attributes: [] } },
    });
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

// ================= GET ROLE BY ID =================
exports.getRoleById = async (req, res) => {
  try {
    const { role_id } = req.params;
    const role = await Role.findOne({
      where: { role_id },
      include: { model: Permission, through: { attributes: [] } },
    });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

// ================= UPDATE ROLE =================
exports.updateRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findByPk(role_id);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    if (name) role.name = name;
    if (description) role.description = description;
    await role.save();

    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// ================= DELETE ROLE =================
exports.deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const role = await Role.findByPk(role_id);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    await role.destroy(); 
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
