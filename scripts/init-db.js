const { Pool } = require('pg')
const config = require('../database/db.config.js')

const pool = new Pool(config)

pool.query('SELECT * from Customer', (err, res) => {
  console.log(err, res)
  pool.end()
})
