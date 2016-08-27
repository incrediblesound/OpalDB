const assert = require('assert')
const opal = require('../main')

const db = new opal.Database()

const book = new opal.Schema('book', {
  title: opal.String,
  authorId: opal.Number,
  publicationYear: opal.Number
})

const author = new opal.Schema('author', {
  name: opal.String,
  country: opal.String,
  genre: opal.Array
})

const Author = opal.model(author)
const Book = opal.model(book)

db.addTable('books', book)
db.addTable('authors', author)

let joyce = new Author({
  name: 'James Joyce',
  country: 'Britain'
})

let king = new Author({
  name: 'Stephen King',
  country: 'USA'
})

let cujo = new Book({
  name: 'Cujo'
})

let shining = new Book({
  name: 'The Shining'
})

let wake = new Book({
  name: "Finnegan's Wake"
})

const authors = db.in('authors')
const books = db.in('books')

joyce = authors.insert(joyce)
king = authors.insert(king)
cujo = books.insert(cujo)
shining = books.insert(shining)
wake = books.insert(wake)

cujo.authorId = king.id
shining.authorId = king.id
wake.authorId = joyce.id

books.update(cujo)
books.update(shining)
books.update(wake)

describe('Join', () => {
  it('Can perform joins on tables', () => {
    const resultA = books
      .join('authorId')
      .to('authors')
      .where('name')
      .equals('James Joyce')
    const resultB = books
      .join('authorId')
      .to('authors')
      .where('name')
      .equals('Stephen King')
    assert(resultB.length === 2)
  })
})
