class Schema {
  constructor (name, layout) {
    this.name = name
    this.layout = layout
    this.data = null
    this.beforeSave = null
  }
  validate (data) {
    if (recordIsValid(data, this.layout)) {
      this.data = data
    }
  }
}

function isObject (value) {
  return !Array.isArray(value) && typeof value === 'object'
}

function recordIsValid (record, layout) {
  const layoutKeys = Object.keys(layout)
  layoutKeys.forEach((key) => {
    const recordValue = record[key]
    const valueConstructor = layout[key]
    if (!recordValue) {
      return
    } else if (isObject(valueConstructor)) {
      return recordIsValid(recordValue, valueConstructor)
    } else {
      new valueConstructor(recordValue).validate()
    }
  })
  return true
}

module.exports = Schema
