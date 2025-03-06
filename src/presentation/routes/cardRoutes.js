const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.post('/', cardController.createCard);
router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

router.post('/initialize/:gameId', cardController.initializeDeck);

module.exports = router;