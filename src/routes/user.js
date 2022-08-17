import express from 'express';

import userController from '../controllers/user.js';
import priviledges from '../helpers/priviledges.js';
import authenticator from '../helpers/authenticator.js';

const router = express.Router();

router
  .post('/signin', userController.signin)
  .post('/login', userController.login)
  .put(
    '/',
    authenticator([priviledges.admin]),
    userController.manageUser,
  ) // Manage user privileges
  .delete(
    '/:id',
    authenticator([priviledges.admin]),
    userController.deleteUser,
  );

export default router;
