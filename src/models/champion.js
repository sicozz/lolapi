const Sequelize = require('sequelize');
const sequelize = require('../services/database');
const StatDAO = require('./stat');

// Champ table
const Champion = sequelize.define(
  'champion',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    version: {
      type: Sequelize.STRING
    },

    title: {
      type: Sequelize.STRING
    },

    attack: {
      type: Sequelize.INTEGER
    },

    defense: {
      type: Sequelize.INTEGER
    },

    magic: {
      type: Sequelize.INTEGER
    },

    difficulty: {
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false,
    // associate: models => {
    //   Champion.hasOne(models.stat, {
    //     foreignKey: 'id',
    //     onDelete: 'CASCADE'
    //   });
    //   return Champion;
    // }
  }
);

Champion.hasOne(StatDAO, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

module.exports = Champion;
