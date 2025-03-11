const express = require('express');
const scoreController = require('../controllers/scoreController');
const { validateScore, validateIdParam, handleValidationErrors } = require('../../business/validators/inputValidator');

const router = express.Router();

router.post('/', validateScore, handleValidationErrors, scoreController.createScore);
router.get('/', scoreController.getAllScores);
router.get('/:id', validateIdParam, handleValidationErrors, scoreController.getScoreById);
router.get('/player/:playerId', validateIdParam, handleValidationErrors, scoreController.getScoresByPlayer);
router.get('/game/:gameId', validateIdParam, handleValidationErrors, scoreController.getScoresByGame);
router.put('/:id', validateIdParam, validateScore, handleValidationErrors, scoreController.updateScore);
router.delete('/:id', validateIdParam, handleValidationErrors, scoreController.deleteScore);

module.exports = router;