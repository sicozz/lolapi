const express = require('express');

const statController = require('../controllers/stat');

const router = express.Router();

router.get('/:name', statController.getStats);

module.exports = router;
