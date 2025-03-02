module.exports = {
  secret: process.env.JWT_SECRET || '@Mapache2005',
  refreshSecret: process.env.JWT_REFRESH_SECRET || '@Mapache2005Refresh',
  expiresIn: '1h',
  refreshExpiresIn: '7d',
};