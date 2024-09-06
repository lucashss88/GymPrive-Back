const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.NODE_ENV === 'production' ? process.env.PGDATABASE : process.env.DB_NAME;
const dbUser = process.env.NODE_ENV === 'production' ? process.env.PGUSER : process.env.DB_USER;
const dbPassword = process.env.NODE_ENV === 'production' ? process.env.PGPASSWORD : process.env.DB_PASSWORD;
const dbHost = process.env.NODE_ENV === 'production' ? process.env.PGHOST : process.env.DB_HOST;
const dbPort = process.env.NODE_ENV === 'production' ? process.env.PGPORT : process.env.DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres', 
  dialectOptions: {
    ssl: {
      require: true, // requer SSL
      rejectUnauthorized: false // para ignorar problemas de certificado autoassinado
    }
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Postgres connected...'))
  .catch(err => console.error('Error connecting to Postgres:', err.message));

module.exports = sequelize;
