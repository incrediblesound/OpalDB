const Table = require('../table/table')

class Opal {
  constructor () {
    this.tables = {}
    this.listeners = {}
  }
  addTable (name) {
    if (this.tables[name] !== undefined) {
      throw new Error(`A table with the name ${name} already exists`)
    }
    this.tables[name] = new Table(name)
  }
}

module.exports = Opal
