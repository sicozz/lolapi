import Sequelize from 'sequelize';

import sequelize from '../services/sql/database.js';
import User from './user.js';
import Champion from './sql/champion.js';

// Users champions table
const UserChampion = sequelize.define(
  'UserChampion',
  {
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    ChampionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Champions',
        key: 'id',
      },
    },
  },
  { timestamps: false },
);

User.belongsToMany(Champion, {
  through: 'UserChampion',
});

Champion.belongsToMany(User, {
  through: 'UserChampion',
});

export default UserChampion;
