const sequelize = require('sequelize');
const db = require('../config/db');

const potoModel = db.define(
  'poto',
  {
    idfoods: { type: sequelize.STRING },
    path: { type: sequelize.STRING },
  },
);
module.exports = potoModel;
