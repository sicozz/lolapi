import express from 'express';

import champsController from '../../controllers/mongo/champion.js';
import priviledges from '../../helpers/priviledges.js';
import auth from '../../helpers/auth.js';

const router = express.Router();

// MONGODB
router
  .get('/', champsController.getAllChamps)
  .post(
    '/',
    auth([priviledges.rioter]),
    champsController.addChamp,
  )
  .put(
    '/',
    auth([priviledges.rioter]),
    champsController.updateChamp,
  );

router
  .get('/:name', champsController.getChamp)
  .delete(
    '/:name',
    auth([priviledges.rioter]),
    champsController.deleteChamp,
  );

router
  .get(
    '/refresh/:name',
    auth([priviledges.user, priviledges.rioter]),
    champsController.refreshChamp,
  );

export default router;
