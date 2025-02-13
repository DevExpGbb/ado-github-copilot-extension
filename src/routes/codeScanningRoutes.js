const express = require('express');
const router = express.Router();
const codeScanningController = require('../controllers/codeScanningController');

router.post('/', codeScanningController.getAlerts);

module.exports = router;