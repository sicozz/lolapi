// Node modules
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// Constants
import routeURIs from './constants/routes.js';

// DB init
import sequelize from './services/sql/database.js';

// Routes
import championRoutes from './routes/champion.js';
import statRoutes from './routes/stat.js';
import errorController from './controllers/error.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routeURIs.champion, championRoutes);
app.use(routeURIs.stat, statRoutes);

app.use(errorController.get404);

const errorHandler = (error, _req, res, _next) => {
  console.log(`Catched error: ${error}`);
  res.status(500).json(error.message);
};
app.use(errorHandler);

(async () => {
  try {
    await sequelize.sync({ force: false });
    mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@${process.env.MONGO_CONTAINER}:27017`);
    app.listen(3000);
  } catch (err) {
    console.error(`Problem with app initialization: ${err}`);
  }
})();
