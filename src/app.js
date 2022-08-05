// Node modules
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Constants
const routeURIs = require('./constants/routes');

// DB init
const sequelize = require('./services/database');

// Routes
const championRoutes = require('./routes/champion');
const statRoutes = require('./routes/stat');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routeURIs.championRoute, championRoutes);
app.use(routeURIs.statRoute, statRoutes);

app.use(errorController.get404);

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(3000);
  } catch (err) {
    console.error(err);
  }
})();
