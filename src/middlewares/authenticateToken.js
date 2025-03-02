const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { isTokenBlacklisted } = require('../utils/tokenBlacklist');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(403).json({ error: 'Token inválido (cerrado sesión)' });
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;