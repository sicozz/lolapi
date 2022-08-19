import express from 'express';

import champsController from '../../controllers/sql/champion.js';
import priviledges from '../../helpers/priviledges.js';
import uploads from '../../helpers/uploads.js';
import auth from '../../helpers/auth.js';

const router = express.Router();

router
  .get('/image/:name', champsController.getChampionImage)
  .post(
    '/image/:name',
    auth([priviledges.rioter]),
    uploads.image.single('image'),
    champsController.uploadChampionImage,
  );

// SQL
router
  .get('/', champsController.getAllChamps)
  .post(
    '/',
    // auth([priviledges.rioter]),
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
