const sequelize = require('sequelize');
const db = require('../config/db');

const foodsModel = db.define(
  'foods',
  {
    namamakan: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    daerah: {
      type: sequelize.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: sequelize.STRING,
      allowNull: false,
    },

  },
);
module.exports = foodsModel;
