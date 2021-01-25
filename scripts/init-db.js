var pgp = require('pg-promise')()
var db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

async function initializeDatabase() {
  await db.connect()
  await db.one()
}
