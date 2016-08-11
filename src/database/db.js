const Table = require('../table/table')

class Opal {
  constructor () {
    this.tables = {}
  }
  addTable (name) {
    if (!name || typeof name !== 'string') {
      throw new Error(`The addTable method requires a table name that is a string.`)
    }
    if (this.tables[name] !== undefined) {
      throw new Error(`A table with the name ${name} already exists`)
    }
    this.tables[name] = new Table(name)
  }
}

module.exports = Opal
