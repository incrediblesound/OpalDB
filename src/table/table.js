const Schema = require('../schema/schema')

class Table {
  constructor (name) {
    this.name = name
    this.records = []
    this.idIndex = {}
    this.counter = 0
  }
  insert (record) {
    record.id = this.counter
    this.idIndex[record.id] = record
    this.records.push(record)
    this.counter++
    return record
  }
}

module.exports = Table
