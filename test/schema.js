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
    assert.throws(() => person.validate(invalidRecord), /Record is invalid. Value 31 is not of type NUMBER/)
  })
  it('Should validate nested properties', () => {
    assert.throws(() => person.validate(invalidNestedRecord), /Record is invalid. Value three is not of type NUMBER/)
  })
})
