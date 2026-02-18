const { User, Role, Sequelize } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateRandomPassword = (length = 12) =>
  crypto.randomBytes(length).toString('base64').slice(0, length);

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expiry = Date.now() + 3600 * 1000; // 1 hour
  return { token, hashedToken, expiry };
};



// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  try {
    const { employee_id, role_id } = req.body;

    if (!employee_id)
      return res.status(400).json({ error: 'employee_id is required' });

    const existingUser = await User.findOne({ where: { employee_id } });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    // 🔥 OPTIONAL: Validate employee_id against HR API here

    const tempPassword = generateRandomPassword();

    const user = await User.create({
      employee_id,
      password: tempPassword, // model hook hashes it
      isActive: true,
      mustResetPassword: true,
    });

    if (role_id) {
      const role = await Role.findByPk(role_id);
      if (!role)
        return res.status(400).json({ error: 'Invalid role_id' });

      await user.addRole(role_id);
    }

    // ⚠️ In HR-based systems, email should come from HR API
    // const employeeEmail = await getEmailFromHR(employee_id);

    res.status(201).json({
      message: 'User created successfully',
      temporaryPassword: tempPassword, // send only once
      user_id: user.user_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};



// ================= GET USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isActive: true },
      include: { model: Role, through: { attributes: [] } },
    });

    res.json(users); // password automatically excluded via defaultScope
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};



// ================= GET USER BY ID =================
exports.getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({
      where: { user_id, isActive: true },
      include: { model: Role, through: { attributes: [] } },
    });

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};



// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { role_id, isActive } = req.body;

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({ error: 'User not found' });

    if (typeof isActive === 'boolean')
      user.isActive = isActive;

    await user.save();

    if (role_id) {
      const role = await Role.findByPk(role_id);
      if (!role)
        return res.status(400).json({ error: 'Invalid role_id' });

      await user.setRoles([role_id]);
    }

    res.json({ message: 'User updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};



// ================= SOFT DELETE =================
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({ error: 'User not found' });

    user.isActive = false;
    await user.save();

    res.json({ message: 'User deactivated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};



// ================= REQUEST PASSWORD RESET =================
exports.requestPasswordReset = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const user = await User.findOne({
      where: { employee_id, isActive: true },
    });

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    const { token, hashedToken, expiry } = generateResetToken();

    user.resetToken = hashedToken;
    user.resetTokenExpiry = expiry;
    await user.save();

    // ⚠️ Email should be fetched from HR system
    // const employeeEmail = await getEmailFromHR(employee_id);

    res.json({
      message: 'Password reset token generated',
      resetToken: token, // In production, send via email instead
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send password reset' });
  }
};



// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.scope('withPassword').findOne({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { [Op.gt]: Date.now() },
        isActive: true,
      },
    });

    if (!user)
      return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = newPassword; // model hook hashes it
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.mustResetPassword = false;

    await user.save();

    res.json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};
