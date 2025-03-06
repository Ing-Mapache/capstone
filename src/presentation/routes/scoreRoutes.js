const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.post('/', scoreController.createScore);
router.get('/', scoreController.getAllScores);
router.get('/:id', scoreController.getScoreById);
router.get('/player/:playerId', scoreController.getScoresByPlayer);
router.get('/game/:gameId', scoreController.getScoresByGame);
router.put('/:id', scoreController.updateScore);
router.delete('/:id', scoreController.deleteScore);

module.exports = router;