const Table = require('../table/table')
const Cursor = require('../cursor/cursor')
const Schema = require('../schema/schema')

class Opal {
  constructor () {
    this.tables = {}
    this.listeners = {}
  }
  addTable (name, schema) {
    if (!name || !schema || !schema instanceof Schema) {
      throw new Error(`The addTable method requires a table name and a valid schema instance.`)
    }
    if (this.tables[name] !== undefined) {
      throw new Error(`A table with the name ${name} already exists`)
    }
    this.tables[name] = new Table(name, schema)
    this.listeners[name] = {
      'insert': [],
      'delete': [],
      'update': []
    }
  }
  in (tableName) {
    if (this.tables[tableName] === undefined) {
      throw new Error(`There is no table with the name ${tableName}.`)
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
