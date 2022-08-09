import express from 'express';

import champsController from '../controllers/champion.js';

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

export default router;
