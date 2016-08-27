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

class JoinQuery {
  constructor (records, key, path, joinTable, ValueConstructor) {
    this.records = records
    this.joinTable = joinTable
    this.key = key
    this.path = path
    this.ValueConstructor = ValueConstructor
  }
  equals (value) {
    return this.records.filter((record) => {
      const joinedRecord = this.joinTable.idIndex[record[this.key]]
      const storedValue = new this.ValueConstructor(fetchStoredValue(joinedRecord, this.path))
      return storedValue.equals(value)
    }).map((record) => JSON.parse(JSON.stringify(record)))
  }
}

module.exports = JoinQuery
