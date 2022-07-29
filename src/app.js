// Node modules
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// DB init
const sequelize = require('./services/database');
const dbConfig = require('./services/database.config');

// Routes
const champsRoutes = require('./routes/champs');
const statsRoutes = require('./routes/stats');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/champs', champsRoutes);
app.use('/stats', statsRoutes);

app.use(errorController.get404);

(async () => {
    try {
        dbConfig();
        await sequelize.sync({ force: false });
        app.listen(3000);
    } catch(err) {
        console.error(err);
    }
})();