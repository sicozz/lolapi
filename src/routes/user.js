import express from 'express';

import userController from '../controllers/user.js';
import priviledges from '../helpers/priviledges.js';
import uploads from '../helpers/uploads.js';
import auth from '../helpers/auth.js';

const router = express.Router();

router
  .post('/signin', userController.signin)
  .post('/login', userController.login);

router
  .put(
    '/',
    auth([priviledges.admin]),
    userController.manageUser,
  ) // Manage user privileges
  .delete(
    '/:id',
    auth([priviledges.admin]),
    userController.deleteUser,
  );

router
  .get(
    '/champions',
    auth([priviledges.rioter, priviledges.user]),
    userController.getChampions,
  )
  .post(
    '/champions',
    auth([priviledges.rioter, priviledges.user]),
    uploads.xlsx.single('xlsx'),
    userController.addChampionsXLSX,
  );

router
  .post(
    '/champions/playable',
    auth([priviledges.rioter, priviledges.user]),
    uploads.xlsx.single('xlsx'),
    userController.playableChampionsXLSX,
  )

export default router;
