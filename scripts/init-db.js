const pgp = require('pg-promise')()
const fs = require('fs')
const glob = require('glob')
const { exit } = require('process')

const db = pgp(
  'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
)

async function recreateDatabaseTablesWithData() {
  try {
    await db.connect()

    console.log('Deleting database tables')
    await db.any('select DeleteTables();')

    console.log('Creating database tables')
    await db.any(fs.readFileSync('database/create.pks', { encoding: 'utf-8' }))
    await db.any(fs.readFileSync('database/init.pks', { encoding: 'utf-8' }))
    await db.any(`select CreateTables();select PopulateDatabase();`)

    console.log('Recreated the database successfully')
  } catch (err) {
    console.error('Failed to recreate the tables')
  }
}

async function recreateAllFunctions() {
  try {
    await db.connect()

    const plSqlFiles = await new Promise((resolve, reject) => {
      glob('database/**/*.pks', {}, async (err, files) => {
        if (err) reject()
        else resolve(files)
      })
    })

    console.log('Deploying all the functions')

    const promises = plSqlFiles.map((file) =>
      db.any(fs.readFileSync(file, { encoding: 'utf-8' }))
    )

    await Promise.all(promises)
    console.log('Recreated the functions successfully')
  } catch (err) {
    console.error('Failed to recreate the tables')
  }
}

async function main() {
  const command = process.argv[2]

  if (!command || command === '--full') {
    await recreateDatabaseTablesWithData()
    await recreateAllFunctions()
  } else if (command === '--func') {
    await recreateAllFunctions()
  } else if (command === '--tables') {
    await recreateDatabaseTablesWithData()
  }
  exit(0)
}

main()
