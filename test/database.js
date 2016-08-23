const assert = require('assert')
const Table = require('../src/table/table')
const Cursor = require('../src/cursor/cursor')
const opal = require('../main')

const person = new opal.Schema('person', {})

describe('Database', () => {
  it('Creates an instance', () => {
    const db = new opal.Database()
    assert(db instanceof opal.Database)
  })
  it('Can add a table and a map of listeners', () => {
    const db = new opal.Database()
    db.addTable('people', person)
    assert(db.tables.people instanceof Table)
    assert(db.listeners !== undefined)
  })
  it('Will return a cursor for a selected table', () => {
    const db = new opal.Database()
    db.addTable('people', person)
    const cursor = db.in('people')
    assert(cursor instanceof Cursor)
  })
})
