import Sequelize from 'sequelize';

import sequelize from '../../services/sql/database.js';
// import Champion from './champion.js';

// Champs stats table
const Stat = sequelize.define(
  'stat',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    championId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'champions',
        key: 'id'
      }
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    hp: {
      type: Sequelize.FLOAT
    },

    hpperlevel: {
      type: Sequelize.FLOAT
    },

    mp: {
      type: Sequelize.FLOAT
    },

    mpperlevel: {
      type: Sequelize.FLOAT
    },

    movespeed: {
      type: Sequelize.FLOAT
    },

    armor: {
      type: Sequelize.FLOAT
    },

    armorperlevel: {
      type: Sequelize.FLOAT
    },

    spellblock: {
      type: Sequelize.FLOAT
    },

    spellblockperlevel: {
      type: Sequelize.FLOAT
    },

    attackrange: {
      type: Sequelize.FLOAT
    },

    hpregen: {
      type: Sequelize.FLOAT
    },

    hpregenperlevel: {
      type: Sequelize.FLOAT
    },

    mpregen: {
      type: Sequelize.FLOAT
    },

    mpregenperlevel: {
      type: Sequelize.FLOAT
    },

    crit: {
      type: Sequelize.FLOAT
    },

    critperlevel: {
      type: Sequelize.FLOAT
    },

    attackdamage: {
      type: Sequelize.FLOAT
    },

    attackdamageperlevel: {
      type: Sequelize.FLOAT
    },

    attackspeedperlevel: {
      type: Sequelize.FLOAT
    }
  },
  {
    timestamps: false,
    // associate: models => {
    //   // This method sems to never be executed
    //   Stat.belongsTo(models.champion, {
    //     foreignKey: 'id',
    //   });
    //   return Stat;
    // }
  }
);

// Stat.associate = models => {
//   Stat.hasOne(models.champion, {
//     foreignKey: 'championId',
//   });
//   return Stat;
// };

// Stat.belongsTo(Champion, {
//   foreignKey: 'id',
// });

export default Stat;
