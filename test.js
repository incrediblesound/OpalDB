const opal = require('./main')

const db = new opal.Database()

const person = new opal.Schema('person', {
  name: 'STRING',
  age: 'NUMBER',
  address: {
    city: 'STRING',
    state: 'STRING'
  },
  hobbies: 'ARRAY'
})

const Person = opal.model(person)

const james = new Person({
  name: 'James',
  age: 31,
  address: { city: 'Sunnyvale', state: 'CA' },
  hobbies: ['art', 'music']
})

const james2 = new Person({
  name: 'James',
  age: 18,
  address: { city: 'Sunnyvale', state: 'CA' },
  hobbies: ['magic', 'WOW']
})

const bob = new Person({
  name: 'Bob Shmobin',
  age: 21,
  address: { city: 'Palo Alto', state: 'CA' },
  hobbies: ['sports', 'dancing']
})

db.addTable('people', person)
// db.in('people').listen('insert', (record) => {
//     console.log(record)
// })
db.in('people').insert(james)
db.in('people').insert(james2)
db.in('people').insert(bob)
db.in('people').createIndex('name')
// db.in('people').delete(1)
// const record = db.in('people').getByIndex('name', 'James')
const record2 = db.in('people').where('age').lessThan(30)
// const recordA = db.in('people').findWhere({ address: { state: 'CA' } })
// const recordB = db.in('people').findWhere({ address: { city: 'Palo Alto' } })
// const recordC = db.in('people').where('hobbies').contains('dancing')

console.log(record2)
