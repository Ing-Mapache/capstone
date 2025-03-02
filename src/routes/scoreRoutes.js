const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.post('/scores', scoreController.createScore);
router.get('/scores/:id', scoreController.getScoreById);
router.put('/scores/:id', scoreController.updateScore);
router.delete('/scores/:id', scoreController.deleteScore);

module.exports = router;