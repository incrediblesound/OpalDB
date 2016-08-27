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

const jim = new Person(jimRecord)
db.addTable('people', person)
const people = db.in('people')

/* global describe it */
describe('Cursor', () => {
  it('Can insert records into a table', () => {
    people.insert(jim)
    assert.deepEqual(people.getById(0), jimRecord)
  })
  it('Can create an index in a table', () => {
    people.createIndex('name')
    assert(people.table.indexKeys[0] === 'name')
    assert.equal('object', typeof people.table.indexes.name.Jim)
    assert.deepEqual(people.table.indexes.name.Jim[0], jimRecord)
  })
  it('Will not update record into a table', () => {
    assert.throws(
      () => {
        people.update(0, {
          name: ['We are the Borg']
        })
      },
      /Record is invalid. Value We are the Borg is not of type STRING/
    )
  })
  it('Will update record into a table', () => {
    people.update(0, {
      name: 'James T. Kirk',
      hobbies: ['star', 'fleet', 'admiral']
    })
    assert.equal(people.getById(0).name, 'James T. Kirk')
    assert.equal(people.getById(0).age, 32)
    assert.deepEqual(people.getById(0).address, {
      houseNumber: 12,
      street: 'Street st',
      city: 'Townville',
      zipcode: 12345
    })
    assert.deepEqual(people.getById(0).hobbies, ['star', 'fleet', 'admiral'])
  })
  it('Will delete a record from .records and from indexes', () => {
    people.delete(0)
    assert.equal(0, people.table.indexes.name['James T. Kirk'].length)
  })
})
