const express = require('express');
const router = express.Router();
const workItemsController = require('../controllers/workItemsController');

router.post('/', workItemsController.getWorkItems);

module.exports = router;