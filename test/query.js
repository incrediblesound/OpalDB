const assert = require('assert')
const opal = require('../main')

const db = new opal.Database()

const person = new opal.Schema('person', {
  name: opal.String,
  age: opal.Number,
  address: {
    houseNumber: opal.Number,
    street: opal.String,
    city: opal.String,
    zipcode: opal.Number
  },
  hobbies: opal.Array
})

const Person = opal.model(person)

const jimRecord = {
  name: 'Jim',
  age: 32,
  address: {
    houseNumber: 12,
    street: 'Street st',
    city: 'Townville',
    zipcode: 12345
  },
  hobbies: ['art', 'music', 'soccer']
}

const bobRecord = {
  name: 'Bob',
  age: 29,
  address: {},
  hobbies: ['football', 'bbq', 'comics']
}

const janeRecord = {
  name: 'Jane',
  age: 28,
  address: {},
  hobbies: ['reading', 'surfing', 'singing']
}

db.addTable('people', person)

const jim = new Person(jimRecord)
const bob = new Person(bobRecord)
const jane = new Person(janeRecord)

const people = db.in('people')
people.insert(jim)
people.insert(bob)
people.insert(jane)

describe('Cursor', () => {
  it('Has a contains function', () => {
    const results = people.where('hobbies').contains('surfing')
    assert(results.length === 1 && results[0].name === 'Jane')
  })
})
