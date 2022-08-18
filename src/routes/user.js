import express from 'express';

import userController from '../controllers/user.js';
import priviledges from '../helpers/priviledges.js';
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
    userController.getChampions,
  )
  .post(
    '/champions',
    userController.addChampions,
  );

export default router;
