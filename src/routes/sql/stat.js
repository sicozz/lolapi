import express from 'express';

import statController from '../../controllers/sql/stat.js';

const router = express.Router();

router.get('/:name', statController.getStats);

export default router;
