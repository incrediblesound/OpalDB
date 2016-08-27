const assert = require('assert')
const opal = require('../main')

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
