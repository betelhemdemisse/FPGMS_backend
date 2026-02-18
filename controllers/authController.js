const { User, Role, Permission } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, isActive: true },
      include: {
        model: Role,
        through: { attributes: [] },
        include: {
          model: Permission,
          through: { attributes: [] },
          attributes: ['resource', 'action'],
        },
      },
    });

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    if (user.mustResetPassword) {
      return res.status(403).json({
        error: 'Password reset required',
        mustResetPassword: true,
        user_id: user.user_id,
      });
    }

    const permissionsSet = new Set();
    user.Roles.forEach(role => {
      role.Permissions.forEach(p => {
        if (p.resource && p.action) {
          permissionsSet.add(`${p.resource}:${p.action}`);
        }
      });
    });
    const permissions = Array.from(permissionsSet);

    const payload = {
      user_id: user.user_id,
      email: user.email,
      roles: user.Roles.map(r => r.name),
      permissions,
    };

    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '8h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
