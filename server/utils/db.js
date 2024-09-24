const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'myuser', // Updated user
  password: 'mypassword', // Updated password
  database: 'todo',
});

module.exports = {
  pool,
};