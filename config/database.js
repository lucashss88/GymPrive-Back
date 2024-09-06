const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres', 
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Postgres connected...'))
  .catch(err => console.error('Error connecting to Postgres:', err.message));

module.exports = sequelize;
