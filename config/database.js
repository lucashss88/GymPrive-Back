const { Sequelize } = require('sequelize');
require('dotenv').config();

// const dbName = process.env.NODE_ENV === 'production' ? process.env.PGDATABASE : process.env.DB_NAME;
// const dbUser = process.env.NODE_ENV === 'production' ? process.env.PGUSER : process.env.DB_USER;
// const dbPassword = process.env.NODE_ENV === 'production' ? process.env.PGPASSWORD : process.env.DB_PASSWORD;
// const dbHost = process.env.NODE_ENV === 'production' ? process.env.PGHOST : process.env.DB_HOST;
// const dbPort = process.env.NODE_ENV === 'production' ? process.env.PGPORT : process.env.DB_PORT;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false 
      }
    },
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Postgres connected...'))
  .catch(err => console.error('Error connecting to Postgres:', err.message));

module.exports = sequelize;
