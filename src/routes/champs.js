const express = require('express');

const champsController = require('../controllers/champs');

const router = express.Router();

router
    .get('/', champsController.getAllChamps)
    .post('/', champsController.addChamp)
    .put('/', champsController.updateChamp);

router
    .get('/:id', champsController.getChamp)
    .delete('/:id', champsController.deleteChamp);

module.exports = router;