OpalDB
=======
OpalDB is a minimal in-memory database with zero dependencies written in JavaScript for Node.js. It is in the early stages of development and should not be considered production ready.

OpalDB is made to uphold two basic principles. The first is that the codebase is simple, easy to understand and has no external dependencies. The second is that the data should be correct. Every table in OpalDB requires a schema and any operation that doesn't make sense for that schema should throw an error.

Getting Started
------
OpalDB is an NPM package, so install with
```shell
npm install opaldb --save
```
and import the package
```javascript
const opal = require('opaldb')

// exposes Database, Schema and model

```

Models
------
First make a schema for your records, then convert that schema into a model, and then create records.
```javascript
const opal = require('opal')
const Schema = opal.Schema;
const Model = opal.Model;

/*
 * Possible value types are 'STRING', 'NUMBER', 'ARRAY'
 * currently no support for required properties
 */

const person = new Schema({
  name: 'STRING',
  age: 'NUMBER',
  hobbies: 'ARRAY'
})

const PersonModel = opal.model(person)

const joe = new PersonModel({
  name: 'Joe Shmoe',
  age: 28,
  hobbies: ['soccer', 'baseball']
})
```
The schema does simple validation and the model provides an onBeforeSave hook.

```javascript
const bob = new PersonModel({
  name: 'Bob',
  age: 23,
  hobbies: 'Baskeball, etc'
})
// The above code will throw an error because hobbies is not an array.

UserModel.onBeforeSave((record) => {
  record.password = hashAndSalt(record.password)
})
// Now our users will have secure passwords.
```

Tables
------

First create a database, then add a table to it, then insert records into the table.

```javascript
const db = new opal.Database()

db.addTable('people')

db.in('people').insert(joe)
```

Events
------

You can add listeners for insert, update and delete.

```javascript
db.in('people').listen('insert', (record) => {
  console.log(record)
})
```

Queries
-------

Queries at the table level include getById and findWhere. The former is a quick table lookup
and the latter is an expensive match between the records in the database and the object passed into
the findWhere function. You can also delete by index which is fairly straightforward.

```javascript
db.in('people').getById(0) // returns Joe

db.in('people').findWhere({ name: 'Joe Shmoe' }) // also returns Joe

db.in('people').delete(0) // deletes Joe
```
Use the 'where' method to return a query on a property of the records in a specific table.
The 'where' method returns a query object that has type specific methods for matching records.
```javascript

// .contains() only works with array properties
db.in('people').where('hobbies').contains('soccer')

// .lessThan() and .greaterThan() work with number properties
db.in('people').where('age').lessThan(30)

// .equals() works with numbers and string but not arrays
db.in('people').where('name').equals('Joe')

```
For nested records, the 'where' method can take an array of properties.

```javascript
db.in('people').where(['address', 'city']).equals('Palo Alto')
```

Secondary indexes
-----------------

You can create an index from any attribute on a record.

```javascript
db.in('people').createIndex('name')
db.in('people').getByIndex('name', 'Joe') // returns all the people named Joe
```
