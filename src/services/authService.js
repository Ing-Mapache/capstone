const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const logoutUser = (token) => {
  addToBlacklist(token);
};

const generateTokens = (userId, username) => {
  const accessToken = jwt.sign({ userId, username }, jwtConfig.secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, username }, jwtConfig.refreshSecret, { expiresIn: '7d' });
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

module.exports = {
  loginUser,
  logoutUser,
  generateTokens,
};