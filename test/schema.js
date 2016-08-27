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

const invalidRecord = {
  name: 'Jim',
  age: '31'
}

const invalidNestedRecord = {
  name: 'Jim',
  age: 31,
  address: {
    houseNumber: 'three'
  }
}

describe('Schema', () => {
  it('Should exist', () => {
    assert(person)
  })
  it('Should validate properties', () => {
    assert.throws(() => person.validate(invalidRecord), /Value of type string incorrect for property with type "number"./)
  })
  it('Should validate nested properties', () => {
    assert.throws(() => person.validate(invalidNestedRecord), /Value of type string incorrect for property with type "number"./)
  })
})
