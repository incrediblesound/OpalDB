const Query = require('../query/query')

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
    })
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
  getByIndex (index, value) {
    if (!this.table.indexes) {
      throw new Error(`Secondary index "${index}" does not exist.`)
    }
    return this.table.indexes[index][value]
  }
  delete (id) {
    let index = null
    delete this.table.idIndex[id]
    if (this.table.records[id].id === id) {
      index = id
    } else {
      for (var i = 0, l = this.table.records.length; i < l; i++) {
        if (id === this.table.records[i].id) {
          index = i
          break
        }
      }
    }
    if (index === null) {
      this.db.trigger(this.table.name, 'delete', null)
    }
    let deletedRecord = this.table.records[index]
    this.table.records[index] = null
    this.table.indexKeys.forEach((key) => {
      const index = this.table.indexes[key][deletedRecord[key]]
      this.table.indexes[key][deletedRecord[key]] = index.filter((record) => {
        return record.id !== deletedRecord.id
      })
    })
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
