const Sequelize = require('sequelize');
const sequelize = require('../database');

// Champ table definition
const Champ = sequelize.define(
  'champ',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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