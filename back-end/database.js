const Pool = require('pg').Pool

const desk_pool = new Pool({
  user: 'admin',
  password: 'whatadmin123',
  port: 5432,
  database: 'spaces'
})

module.exports = desk_pool
