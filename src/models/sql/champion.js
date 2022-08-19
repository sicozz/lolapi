import Sequelize from 'sequelize';

import sequelize from '../../services/sql/database.js';
import Stat from './stat.js';

// Champ table
const Champion = sequelize.define(
  'Champion',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    remoteKey: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    title: {
      type: Sequelize.STRING,
    },

    attack: {
      type: Sequelize.INTEGER,
    },

    defense: {
      type: Sequelize.INTEGER,
    },

    magic: {
      type: Sequelize.INTEGER,
    },

    difficulty: {
      type: Sequelize.INTEGER,
    },

    image: {
      type: Sequelize.STRING,
      allowNull: true,
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
  },
);

// Champion.associate = models => {
//   Champion.hasOne(models.stat, {
//     foreignKey: 'championId',
//     onDelete: 'CASCADE'
//   });
//   return Champion;
// };

Champion.hasOne(Stat, {
  foreignKey: 'ChampionId',
  onDelete: 'CASCADE',
});

export default Champion;
