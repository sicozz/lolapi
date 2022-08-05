const express = require('express');

const champsController = require('../controllers/champion');

const router = express.Router();

router
  .get('/', champsController.getAllChamps)
  .post('/', champsController.addChamp)
  .put('/', champsController.updateChamp);

router
  .get('/:name', champsController.getChamp)
  .delete('/:name', champsController.deleteChamp);

router
  .get('/refresh/:name', champsController.refreshChamp);

module.exports = router;
