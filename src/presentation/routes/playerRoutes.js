const express = require('express');
const playerController = require('../controllers/playerController');
const { validatePlayer, validateIdParam, handleValidationErrors } = require('../../business/validators/inputValidator');

const router = express.Router();

router.post('/', validatePlayer, handleValidationErrors, playerController.createPlayer);
router.get('/', playerController.getAllPlayers);
router.get('/:id', validateIdParam, handleValidationErrors, playerController.getPlayerById);
router.put('/:id', validateIdParam, validatePlayer, handleValidationErrors, playerController.updatePlayer);
router.delete('/:id', validateIdParam, handleValidationErrors, playerController.deletePlayer);

module.exports = router;