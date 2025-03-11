const tokenBlacklist = new Set();

const addToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

setInterval(() => {
  const now = Date.now();
  tokenBlacklist.forEach((token) => {
    try {
      const decoded = jwt.decode(token);
      if (decoded.exp * 1000 < now) {
        tokenBlacklist.delete(token);
      }
    } catch (error) {
    }
  });
}, 3600000);

module.exports = {
  addToBlacklist,
  isTokenBlacklisted,
};