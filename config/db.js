const { Sequelize } = require('sequelize');
// const getConnect = require('./config.json');

const DB = 'foods';
const USERNAME = 'root';
const PASSWORD = '';
const HOST = '127.0.0.1';
const DIALECT = 'mysql';
const PORT = 3306;

const db = new Sequelize(
  DB,
  USERNAME,
  PASSWORD,
  {
    dialect: DIALECT,
    host: HOST,
    port: PORT,
  },
);

db.sync().then(() => {
  console.log('DB Connection succesful');
}).catch((err) => console.log(`${err.message}`));
module.exports = db;
