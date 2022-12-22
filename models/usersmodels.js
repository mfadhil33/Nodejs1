const sequelize = require('sequelize');
const db = require('../config/db');

const usersmodels = db.define(
  'users',
  {
    username: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  },
);
module.exports = { usersmodels };
