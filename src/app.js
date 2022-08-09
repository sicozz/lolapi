// Node modules
import express from 'express';
import bodyParser from 'body-parser';
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

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(3000);
  } catch (err) {
    console.error(err);
  }
})();
