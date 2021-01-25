var pgp = require('pg-promise')()
var db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

const query = `SELECT * from Customer where id = '156722'`

export default (req, res) => {
  db.connect().then(() => {
    db.one(query)
      .then(function (data) {
        res.statusCode = 200
        res.json(data)
      })
      .catch(function (error) {
        console.log('ERROR:', error)
        res.statusCode = 404
        res.end()
      })
  })
}
