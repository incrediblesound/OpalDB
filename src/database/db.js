const Table = require('../table/table')
const Cursor = require('../cursor/cursor')

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
    this.listeners[name] = {
      'insert': [],
      'delete': [],
      'update': []
    }
  }
  in (tableName) {
    if (this.tables[tableName] === undefined) {
      throw new Error(`There is not table with the name ${tableName}.`)
    }
    return new Cursor(this, this.tables[tableName])
  }
  trigger (tableName, operation, data) {
    this.listeners[tableName][operation].forEach((callback) => {
      callback(data)
    })
  }
}

module.exports = Opal
