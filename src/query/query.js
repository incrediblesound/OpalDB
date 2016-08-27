const values = require('../schema/values')

function fetchStoredValue (record, key) {
  if (!record) {
    return false
  } else if (typeof key === 'string') {
    return record[key]
  } else if (Array.isArray(key)) {
    return key.reduce((acc, curr) => {
      return acc[curr]
    }, record)
  }
}

/* End Helpers */

class Query {
  constructor (key, table, ValueConstructor) {
    this.key = key
    this.table = table
    this.ValueConstructor = ValueConstructor
  }
  lessThan (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.lessThan(value)
    })
  }
  greaterThan (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.greaterThan(value)
    })
  }
  equals (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.equals(value)
    })
  }
  contains (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.contains(value)
    })
  }
}

module.exports = Query
