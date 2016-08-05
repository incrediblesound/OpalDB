OpalDB
=======
OpalDB is a minimal in-memory database with zero dependencies written in JavaScript for Node.js. It is primarily for learning and demonstration purposes and as such should not be considered production ready.

Models
------
First make a schema for your records, then convert that schema into a model, and then create records.
```javascript
const opal = require('opal');
const Schema = opal.Schema;
const Model = opal.Model;

const person = new Schema({
  name: 'STRING',
  age: 'NUMBER',
  hobbies: 'ARRAY'
})

const PersonModel = opal.model(person);

const joe = new PersonModel({
  name: 'Joe Shmoe',
  age: 28,
  hobbies: ['soccer', 'baseball']
})
```

Tables
------

First create a database, then add a table to it, then insert records into the table.

```javascript
const db = new opal.Database();

db.addTable('people');

db.in('people').insert(joe);
```

Events
------

You can add listeners for insert, update and delete.

```javascript
db.in('people').listen('insert', (record) => {
  console.log(record);
})
```

Queries
-------

You can query by id or match on the properties of the record.

```javascript
db.in('people').getById(0); // returns Joe

db.in('people').findWhere({ name: 'Joe Shmoe' }); // also returns Joe...
```
