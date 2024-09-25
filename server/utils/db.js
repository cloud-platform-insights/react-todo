const { Pool } = require('pg');

const pool = new Pool({
  host: 'todo-database.cj02c2008vgi.us-east-2.rds.amazonaws.com',
  user: 'myuser', // Updated user
  password: 'mypassword', // Updated password
  database: 'todo',
});

module.exports = {
  pool,
};