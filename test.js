const opal = require('./main')

const db = new opal.Database()

db.addTable('people')

db.tables.people.insert({
  name: 'Joe',
  age: 31
})
