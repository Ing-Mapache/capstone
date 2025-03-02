const express = require('express');
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/games', authenticateToken, gameController.createGame);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);
router.post('/games/join', authenticateToken, gameController.joinGame);
router.post('/games/start', authenticateToken, gameController.startGame);
router.post('/games/leave', authenticateToken, gameController.leaveGame);
router.post('/games/end', authenticateToken, gameController.endGame);
router.post('/games/state', gameController.getGameState);
router.post('/games/players', gameController.getGamePlayers);
router.post('/games/current-player', gameController.getCurrentPlayer);
router.post('/games/top-discard-card', gameController.getTopDiscardCard);
router.post('/games/scores', gameController.getPlayerScores);
router.post('/games/nextTurn', authenticateToken, gameController.nextTurn);
router.post('/games/playCard', authenticateToken, gameController.playCard);
router.post('/games/drawCard', authenticateToken, gameController.drawCard);

module.exports = router;