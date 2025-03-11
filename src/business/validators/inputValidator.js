const { body, param, validationResult } = require('express-validator');

const validateIdParam = [
  param('id').isUUID().withMessage('El ID debe ser un UUID válido')
];

const validatePlayer = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('age')
    .notEmpty().withMessage('La edad es requerida')
    .isInt({ min: 1, max: 120 }).withMessage('La edad debe ser un número entero entre 1 y 120'),

  body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email debe ser válido')
    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateGame = [
  body('title')
    .notEmpty().withMessage('El título es requerido')
    .isString().withMessage('El título debe ser una cadena de texto')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('El título debe tener entre 2 y 100 caracteres'),

  body('status')
    .optional()
    .isIn(['pending', 'active', 'completed']).withMessage('El estado debe ser uno de: pending, active, completed'),

  body('maxPlayers')
    .optional()
    .isInt({ min: 2, max: 10 }).withMessage('El número máximo de jugadores debe ser entre 2 y 10'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateCard = [
  body('color')
    .notEmpty().withMessage('El color es requerido')
    .isIn(['red', 'green', 'blue', 'yellow', 'black']).withMessage('El color debe ser uno de: red, green, blue, yellow, black'),

  body('value')
    .notEmpty().withMessage('El valor es requerido')
    .isString().withMessage('El valor debe ser una cadena de texto')
    .trim()
    .isLength({ min: 1, max: 20 }).withMessage('El valor debe tener entre 1 y 20 caracteres'),

  body('gameId')
    .notEmpty().withMessage('El ID del juego es requerido')
    .isUUID().withMessage('El ID del juego debe ser un UUID válido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateScore = [
  body('playerId')
    .notEmpty().withMessage('El ID del jugador es requerido')
    .isUUID().withMessage('El ID del jugador debe ser un UUID válido'),

  body('gameId')
    .notEmpty().withMessage('El ID del juego es requerido')
    .isUUID().withMessage('El ID del juego debe ser un UUID válido'),

  body('score')
    .notEmpty().withMessage('La puntuación es requerida')
    .isInt({ min: 0 }).withMessage('La puntuación debe ser un número entero positivo'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateIdParam,
  validatePlayer,
  validateGame,
  validateCard,
  validateScore,
  handleValidationErrors,
};