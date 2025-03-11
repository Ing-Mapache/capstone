const logger = require('../utils/logger');

describe('Logger', () => {
  test('should log an error message', () => {
    const errorMessage = 'Este es un error de prueba';
    logger.error(errorMessage);
  });

  test('should log an info message', () => {
    const infoMessage = 'Este es un mensaje informativo';
    logger.info(infoMessage);
  });
});