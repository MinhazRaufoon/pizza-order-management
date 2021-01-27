const pgp = require('pg-promise')()
const fs = require('fs')
const glob = require('glob')
const { exit } = require('process')

const db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

function recreateDatabaseTablesWithData() {
  db.connect().then(() => {
    glob('database/**/*.pks', {}, async (err, files) => {
      console.log('Deleting database tables')
      await db.any('select DeleteTables();')
      console.log('Creating database tables')
      await db.any(fs.readFileSync('database/init.pks', { encoding: 'utf-8' }))
      await db.any(`
      select CreateTables();
      select PopulateDatabase();
      `)
      console.log('Recreated the database successfully')
      exit()
    })
  })
}

function recreateAllFunctions() {
  db.connect().then(() => {
    glob('database/**/*.pks', {}, async (err, files) => {
      console.log('Deploying all the functions')
      const promises = files.map((file) =>
        db.any(fs.readFileSync(file, { encoding: 'utf-8' }))
      )
      await Promise.all(promises)
      console.log('Recreated the functions successfully')
      exit()
    })
  })
}

const command = process.argv[2]

if (!command || command === '--full') {
  recreateDatabaseTablesWithData()
  recreateAllFunctions()
} else if (command === '--func') {
  recreateAllFunctions()
} else if (command === '--tables') {
  recreateDatabaseTablesWithData()
}
