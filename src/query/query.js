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
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
  greaterThan (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.greaterThan(value)
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
  equals (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.equals(value)
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
  contains (value) {
    return this.table.records.filter((record) => {
      const storedValue = new this.ValueConstructor(fetchStoredValue(record, this.key))
      return storedValue.contains(value)
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
}

module.exports = Query
