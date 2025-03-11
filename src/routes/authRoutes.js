const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/logout', authenticateToken, authController.logoutUser);
router.post('/refresh', authController.refreshToken);

module.exports = router;