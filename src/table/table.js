const Schema = require('../schema/schema')

class Table {
  constructor (name, schema) {
    this.name = name
    this.schema = schema
    this.records = []
    this.idIndex = {}
    this.indexKeys = []
    this.indexes = {}
    this.counter = 0
  }
  insert (record) {
    if (!record.schema || !(record.schema instanceof Schema)) {
      throw new Error('Record is not an instance of an Opal schema.')
    } else if (record.schema.name !== this.schema.name) {
      throw new Error(`Record of type "${record.schema.name}" inserted into table of type "${this.schema.name}". `)
    }

    if (record.beforeSave) {
      record.beforeSave()
    }
    const data = record.data

    data.id = this.counter
    this.idIndex[data.id] = data
    this.indexKeys.forEach((key) => {
      this.indexes[key][data[key]] = this.indexes[key][data[key]] || []
      this.indexes[key][data[key]].push(record)
    })
    this.records.push(data)
    this.counter++
    return JSON.parse(JSON.stringify(data))
  }
  update (id, newRecord) {
    if (id && typeof id === 'object' && !newRecord) {
      newRecord = id
      id = newRecord.id
    }
    const oldRecord = this.idIndex[id]
    Object.assign(oldRecord, newRecord)
  }
  delete (id) {
    let index = null
    delete this.idIndex[id]
    if (this.records[id].id === id) {
      index = id
    } else {
      for (var i = 0, l = this.records.length; i < l; i++) {
        if (id === this.records[i].id) {
          index = i
          break
        }
      }
    }
    if (index === null) {
      this.db.trigger(this.name, 'delete', null)
    }
    let deletedRecord = this.records[index]
    this.records[index] = null
    this.indexKeys.forEach((key) => {
      const index = this.indexes[key][deletedRecord[key]]
      this.indexes[key][deletedRecord[key]] = index.filter((record) => {
        return record.id !== deletedRecord.id
      })
    })
    return deletedRecord
  }
  createIndex (key) {
    this.indexKeys.push(key)
    this.indexes[key] = {}
    this.records.forEach((record) => {
      if (!record) return
      this.indexes[key][record[key]] = this.indexes[key][record[key]] || []
      this.indexes[key][record[key]].push(record)
    })
  }
}

module.exports = Table
