const Sequelize = require('sequelize');
const sequelize = require('../services/database');

// Champ table
const Champ = sequelize.define(
  'champ',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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
  { timestamps: false }
);

module.exports = Champ;