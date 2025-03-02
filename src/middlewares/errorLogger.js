const logger = require('../utils/logger');

const errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });

  next(err);
};

module.exports = errorLogger;