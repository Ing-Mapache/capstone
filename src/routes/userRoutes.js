const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/players', userController.createUser);
router.get('/players/:id', userController.getUserById);
router.put('/players/:id', userController.updateUser);
router.delete('/players/:id', userController.deleteUser);
router.post('/players/register', userController.registerUser);
router.get('/players/profile', authenticateToken, userController.getUserProfile);

module.exports = router;