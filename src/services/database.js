const Sequelize = require('sequelize');

// Lol db connection as root user
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWD,
  {
    dialect: 'mysql'
  }
);

module.exports = sequelize;
