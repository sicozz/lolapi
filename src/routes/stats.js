const express = require('express');

const statsController = require('../controllers/stats');

const router = express.Router();

router.get('/:id', statsController.getStats);
router.put('/', statsController.updateStats);

module.exports = router;