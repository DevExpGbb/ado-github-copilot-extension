const express = require('express');
const router = express.Router();
const adoController = require('../controllers/adoController');

router.post('/', adoController.getWorkItems);

module.exports = router;