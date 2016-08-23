const assert = require('assert')
const opal = require('../main')

const person = new opal.Schema('person', {
  name: 'STRING',
  age: 'NUMBER',
  address: {
    houseNumber: 'NUMBER',
    street: 'STRING',
    city: 'STRING',
    zipcode: 'NUMBER'
  },
  hobbies: 'ARRAY'
})

const Person = opal.model(person)

const jimData = {
  name: 'Jim',
  age: 31,
  address: {
    houseNumber: 3
  }
}

const jim = new Person(jimData)

jim.onBeforeSave((record) => {
  return record
})

describe('Model', () => {
  it('Should create a class', () => {
    assert(Person && typeof Person === 'function')
  })
  it('Should put validated record onto its data property', () => {
    assert.deepEqual(jim.data, jimData)
  })
  it('Should invoke onBeforeSave callback with record data as first arugment', () => {
    assert.deepEqual(jimData, jim.beforeSave())
  })
})
