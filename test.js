const opal = require('./opal');

const db = new opal.Database();

const person = new opal.Schema({
    name: 'STRING',
    age: 'NUMBER',
    address: {
        city: 'STRING',
        state: 'STRING'
    },
    hobbies: 'ARRAY'
})

const Person = opal.Model(person);

const james = new Person({
    name: 'James',
    age: 31,
    address: { city: 'Sunnyvale', state: 'CA' },
    hobbies: ['art', 'music']
})

const bob = new Person({
    name: 'Bob',
    age: 21,
    address: { city: 'Palo Alto', state: 'CA' },
    hobbies: ['sports', 'dancing']
})

db.addTable('people');
db.in('people').listen('insert', (record) => {
    console.log(record);
})
db.in('people').insert(james);
db.in('people').insert(bob);
// const recordA = db.in('people').findWhere({ address: { state: 'CA' } });
// const recordB = db.in('people').findWhere({ address: { city: 'Palo Alto' } });
// const recordC = db.in('people').where('hobbies').contains('dancing');

// console.log(recordA);
// console.log(recordB);
// console.log(recordC);
