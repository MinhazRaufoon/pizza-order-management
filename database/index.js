const pgp = require('pg-promise')()

const DB_KEY = Symbol.for('MyApp.db')
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasDb = globalSymbols.indexOf(DB_KEY) > -1

if (!hasDb) {
  global[DB_KEY] = pgp(
    'postgres://amd_project_618537_rw:iewuo8Af@pgsql.hrz.tu-chemnitz.de:5432/amd_project_618537'
  )
}

const singleton = {}
Object.defineProperty(singleton, 'instance', {
  get: function () {
    return global[DB_KEY]
  },
})
Object.freeze(singleton)

export default singleton
