const authService = require('../services/authService');

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new Error('Todos los campos son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const token = await authService.loginUser(username, password);

    res.status(200).json({ access_token: token });
  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      res.status(401).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      const error = new Error('Token no proporcionado');
      error.statusCode = 401;
      throw error;
    }

    authService.logoutUser(token);

    res.status(200).json({ message: 'Usuario cerró sesión exitosamente' });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    const { accessToken } = authService.generateTokens(decoded.userId, decoded.username);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  refreshToken,
};