import Sequelize from 'sequelize';

import sequelize from '../services/sql/database.js';
import priviledges from '../helpers/priviledges.js';

// User table
const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    passwd: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    priviledges: {
      type: Sequelize.ENUM(...Object.keys(priviledges)),
      allowNull: false,
    },
  },
  { timestamps: false },
);

export default User;
