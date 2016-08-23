const assert = require('assert')
const opal = require('../main')

describe('Module', () => {
  it('Should exist', () => {
    assert.equal('object', typeof opal)
  })
  it('Has a Database constructor', () => {
    assert(opal.Database && typeof opal.Database === 'function')
  })
  it('Has a Schema constructor', () => {
    assert(opal.Schema && typeof opal.Schema === 'function')
  })
  it('Has a function called model', () => {
    assert(opal.model && typeof opal.model === 'function')
  })
})
