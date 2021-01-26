const pgp = require('pg-promise')()
const db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)
const query = `
  select DeleteTables();
  select CreateTables();
  select PopulateDatabase();
`

db.connect().then(() => {
  db.any(query)
    .then(function (data) {
      console.log('Created the database successfully')
    })
    .catch(function (error) {
      console.error(error)
    })
})
