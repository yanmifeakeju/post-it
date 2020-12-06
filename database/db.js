const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

(async () => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
})();

module.exports = sequelize;
