//require packages
require('dotenv').config();
const { Pool } = require("pg");

// create PostgreSQL connection
const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB,
  // password: process.env.PASSWORD,
  // port: 5432
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}@localhost:5432&password=${process.env.PASSWORD}`
  ssl: process.env.NODE_ENV === 'production'
});

module.exports = pool;