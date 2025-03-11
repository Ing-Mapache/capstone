const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.post('/cards', cardController.createCard);
router.get('/cards/:id', cardController.getCardById);
router.put('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);
router.post('/cards/deal', cardController.dealCardsToPlayers);
router.put('/cards/play', cardController.playCard);
router.put('/cards/draw', cardController.drawCard);
router.patch('/cards/say-uno', cardController.sayUno);
router.post('/cards/challenge-uno', cardController.challengeUno);
router.get('/cards/game-state', cardController.getGameState);
router.get('/cards/player-hand', cardController.getPlayerHand);
router.get('/cards/turn-history', cardController.getTurnHistory);
router.get('/cards/current-scores', cardController.getCurrentScores);

module.exports = router;