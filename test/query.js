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

describe('Query', () => {
  it('Has a contains function that matches on arrays', () => {
    const results = people.where('hobbies').contains('surfing')
    assert(results.length === 1 && results[0].name === 'Jane')
  })
  it('Has a lessThan function that matches on numbers', () => {
    const results = people.where('age').lessThan(32)
    assert(results.length === 2 && results[0].name === 'Bob')
  })
  it('Has a greaterThan function that matches on numbers', () => {
    const results = people.where('age').greaterThan(30)
    assert(results.length === 1 && results[0].name === 'Jim')
  })
  it('Has an equals function that matches on strings/numbers', () => {
    const resultsA = people.where('name').equals('Jane')
    const resultsB = people.where('age').equals(29)
    assert(resultsA.length === 1 && resultsA[0].name === 'Jane')
    assert(resultsB.length === 1 && resultsB[0].name === 'Bob')
  })
  it('Has an equals function that matches on arays', () => {
    const results = people.where('hobbies').equals(['reading', 'surfing', 'singing'])
    assert(results.length === 1 && results[0].name === 'Jane')
  })
})
