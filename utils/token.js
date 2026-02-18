const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES }
  );

exports.generateRefreshToken = (user) =>
  jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );
