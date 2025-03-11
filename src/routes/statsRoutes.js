const express = require('express');
const statsController = require('../controllers/statsController');

const router = express.Router();

router.get('/stats/requests', statsController.getRequestStats);
router.get('/stats/response-times', statsController.getResponseTimes);
router.get('/stats/status-codes', statsController.getStatusCodes);
router.get('/stats/popular-endpoints', statsController.getPopularEndpoints);

module.exports = router;