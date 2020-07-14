const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  password: 'whatadmin123',
  port: 5432,
  database: 'spaces'
})

module.exports = pool
