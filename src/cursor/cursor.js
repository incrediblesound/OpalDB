const Query = require('../query/query')
const Join = require('../join/Join')

/* This is the class returned when the user selects a table like this:
 * db.in('tableName'). It serves as an interface to basic table methods
 * like insert and delete and also provides special methods for querying records.
 */

class Cursor {
  constructor (db, table) {
    this.db = db
    this.table = table
  }
  getById (id) {
    return this.table.idIndex[id]
  }
  findWhere (props) {
    return this.table.records.filter((record) => {
      if (!record) return false
      return compareObjects(record, props)
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
  where (path) {
    let ValueConstructor
    if (Array.isArray(path)) {
      ValueConstructor = path.reduce((acc, key) => {
        return acc[key]
      }, this.table.schema.layout)
    } else {
      ValueConstructor = this.table.schema.layout[path]
    }
    return new Query(path, this.table, ValueConstructor)
  }
  insert (record) {
    const data = this.table.insert(record)
    this.db.trigger(this.table.name, 'insert', data)
    return data
  }
  listen (operation, cb) {
    if (['insert', 'update', 'delete'].indexOf(operation) < 0) {
      throw new Error(`There is no listener available for operation "${operation}"`)
    }
    this.db.listeners[this.table.name][operation].push(cb)
  }
  createIndex (key) {
    this.table.createIndex(key)
  }
  update (id, newRecord) {
    this.table.update(id, newRecord)
  }
  getByIndex (index, value) {
    if (!this.table.indexes) {
      throw new Error(`Secondary index "${index}" does not exist.`)
    }
    const record = this.table.indexes[index][value]
    return JSON.parse(JSON.stringify(record))
  }
  join (key) {
    return {
      to: (table) => {
        return new Join(this.table.records, key, this.db.tables[table])
      }
    }
  }
  delete (id) {
    const deletedRecord = this.table.delete(id)
    this.db.trigger(this.table.name, 'delete', deletedRecord)
  }
}

function compareObjects (record, props) {
  const propKeys = Object.keys(props)
  const result = propKeys.reduce((acc, key) => {
    const testValue = props[key]
    const recordValue = record[key]
    if (Array.isArray(testValue)) {
      throw new Error('The method findWhere only works with key/value properties.')
    } else if (typeof testValue === 'object') {
      return acc && compareObjects(recordValue, testValue)
    } else {
      return acc && testValue === recordValue
    }
  }, true)
  return result
}

module.exports = Cursor
