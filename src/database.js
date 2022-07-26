const Sequelize = require('Sequelize');

// Lol db connection as root user
const sequelize = new Sequelize('lol', 'root', 'lolapi', {
    dialect: 'mysql'
});

module.exports = sequelize;