const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { addToBlacklist } = require('../utils/tokenBlacklist');

const logoutUser = (token) => {
  addToBlacklist(token);
};

const generateTokens = (userId, username) => {
  const accessToken = jwt.sign({ userId, username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  const refreshToken = jwt.sign({ userId, username }, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });
  return { accessToken, refreshToken };
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  return generateTokens(user.id, user.username);
};

const refreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    return generateTokens(decoded.userId, decoded.username);
  } catch (error) {
    throw new Error('Refresh token inválido o expirado');
  }
};

module.exports = {
  loginUser,
  logoutUser,
  generateTokens,
  refreshToken,
};