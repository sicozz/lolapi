import express from 'express';

import statController from '../controllers/stat.js';

const router = express.Router();

router.get('/:name', statController.getStats);

export default router;
