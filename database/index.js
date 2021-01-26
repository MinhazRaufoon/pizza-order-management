const pgp = require('pg-promise')()

const database = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

database.connect()

export default database
