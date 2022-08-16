import express from 'express';

import userController from '../controllers/user.js';

const router = express.Router();

router
  .post('/signin', userController.signin)
  .post('/login', userController.login)
  .put('/', userController.manageUser)            // Manage user privileges
  .delete('/:id', userController.deleteUser);

export default router;
