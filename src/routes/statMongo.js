import express from 'express';

import statController from '../controllers/statMongo.js';

const router = express.Router();

router.get('/:name', statController.getStats);

export default router;
