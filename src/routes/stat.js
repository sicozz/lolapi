import express from 'express';

import statController from '../controllers/stat.js';

const router = express.Router();

// SQL
router.get('/sql/:name', statController.sql.getStats);

// MONGO
router.get('/mongo/:name', statController.mongo.getStats);

export default router;
