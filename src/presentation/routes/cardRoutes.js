const express = require('express');
const cardController = require('../controllers/cardController');
const { validateCard, validateIdParam, handleValidationErrors } = require('../../business/validators/inputValidator');

const router = express.Router();

router.post('/', validateCard, handleValidationErrors, cardController.createCard);
router.get('/', cardController.getAllCards);
router.get('/:id', validateIdParam, handleValidationErrors, cardController.getCardById);
router.put('/:id', validateIdParam, validateCard, handleValidationErrors, cardController.updateCard);
router.delete('/:id', validateIdParam, handleValidationErrors, cardController.deleteCard);
router.post('/initialize/:gameId', validateIdParam, handleValidationErrors, cardController.initializeDeck);

module.exports = router;