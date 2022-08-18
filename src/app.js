// Node modules
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import 'dotenv/config';

// Constants
import routeURIs from './constants/routes.js';

// DB init
import sequelize from './services/sql/database.js';

// Routes
import userRoutes from './routes/user.js';
import championSqlRoutes from './routes/sql/champion.js';
import statSqlRoutes from './routes/sql/stat.js';
import championMongoRoutes from './routes/mongo/champion.js';
import statMongoRoutes from './routes/mongo/stat.js';
import errorController from './controllers/error.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  expires: new Date(Date.now() + 3600000),
}));

app.use(routeURIs.user, userRoutes);
app.use(`/sql${routeURIs.champion}`, championSqlRoutes);
app.use(`/mongo${routeURIs.champion}`, championMongoRoutes);
app.use(`/sql${routeURIs.stat}`, statSqlRoutes);
app.use(`/mongo${routeURIs.stat}`, statMongoRoutes);
app.use(errorController.get404);

app.use(errorController.errorHandler);

(async () => {
  try {
    await sequelize.sync({ force: false });
    mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@localhost:27017`);
    app.listen(3000);
  } catch (err) {
    console.error(`Problem with app initialization: ${err}`);
  }
})();
