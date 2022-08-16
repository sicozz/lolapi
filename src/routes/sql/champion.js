import express from 'express';

import champsController from '../../controllers/sql/champion.js';
import priviledges from '../../helpers/priviledges.js';
import authenticator from '../../helpers/authenticator.js';

const router = express.Router();

// SQL
router
  .get('/', champsController.getAllChamps)
  .post(
    '/', 
    authenticator([priviledges.rioter]),
    champsController.addChamp
  )
  .put(
    '/',
    authenticator([priviledges.rioter]),
    champsController.updateChamp
  );

router
  .get('/:name', champsController.getChamp)
  .delete(
    '/:name',
    authenticator([priviledges.rioter]),
    champsController.deleteChamp
  );

router
  .get(
    '/refresh/:name',
    authenticator([priviledges.user, priviledges.rioter]),
    champsController.refreshChamp
  );

export default router;
