const pgp = require('pg-promise')()
const fs = require('fs')
const glob = require('glob')
const { exit } = require('process')

const db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

db.connect().then(() => {
  glob('database/**/*.pks', {}, async (err, files) => {
    await db.any('select DeleteTables();')

    await db.any(fs.readFileSync('database/init.pks', { encoding: 'utf-8' }))

    await db.any(`
      select CreateTables();
      select PopulateDatabase();
    `)

    const promises = files.map((file) =>
      db.any(fs.readFileSync(file, { encoding: 'utf-8' }))
    )

    await Promise.all(promises)

    console.log('Created the database successfully')
    exit()
  })
})
