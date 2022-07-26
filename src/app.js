// Node modules
const express = require('express');
const bodyParser = require('body-parser');

// DB init
const sequelize = require('./database');
const champModel = require('./models/champs');

// Routes
const champsRoutes = require('./routes/champs');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/champs', champsRoutes);

app.use(errorController.get404);

(async () => {
    try {
        await sequelize.sync({ force: false });
        app.listen(3000);
    } catch(err) {
        console.error(err);
    }
})();