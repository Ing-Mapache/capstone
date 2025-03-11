const express = require('express');
const gameController = require('../controllers/gameController');
const { validateGame, validateIdParam, handleValidationErrors } = require('../../business/validators/inputValidator');

const router = express.Router();

router.post('/', validateGame, handleValidationErrors, gameController.createGame);
router.get('/', gameController.getAllGames);
router.get('/:id', validateIdParam, handleValidationErrors, gameController.getGameById);
router.put('/:id', validateIdParam, validateGame, handleValidationErrors, gameController.updateGame);
router.delete('/:id', validateIdParam, handleValidationErrors, gameController.deleteGame);

module.exports = router;