const pgp = require('pg-promise')()

const user = 'amd_project_618537_rw'
const password = 'iewuo8Af'
const host = 'pgsql.hrz.tu-chemnitz.de'
const port = '8080'
const database = 'amd_project_618537'

let connection

export async function connectDB() {
  if (!connection) {
    connection = pgp(
      `postgres://${user}:${password}@${host}:${port}/${database}`
    )
  }
  return connection
}
