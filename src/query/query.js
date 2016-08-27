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
    value = new ValueConstructor()
    value.validate()

    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key)
      return value.lessThan(storedValue)
    })
  }
  greaterThan (value) {
    value = new ValueConstructor()
    value.validate()

    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key)
      return value.greaterThan(storedValue)
    })
  }
  equals (value) {
    value = new ValueConstructor()
    value.validate()

    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key)
      return value.equals(storedValue)
    })
  }
  contains (item) {
    value = new ValueConstructor()
    value.validate()

    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key)
      return value.contains(storedValue)
    })
  }
}

module.exports = Query
