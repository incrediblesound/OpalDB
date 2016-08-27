const JoinQuery = require('./JoinQuery')

class Join {
  constructor (records, key, joinTable) {
    this.records = records
    this.joinTable = joinTable
    this.key = key
  }
  where (path) {
    let ValueConstructor
    if (Array.isArray(path)) {
      ValueConstructor = path.reduce((acc, key) => {
        return acc[key]
      }, this.joinTable.schema.layout)
    } else {
      ValueConstructor = this.joinTable.schema.layout[path]
    }
    return new JoinQuery(this.records, this.key, path, this.joinTable, ValueConstructor)
  }
}

module.exports = Join
