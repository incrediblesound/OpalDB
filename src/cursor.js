const Query = require('./query');

class Cursor {
    constructor(db, table){
        this.db = db;
        this.table = table;
    }
    getById(id){
        return this.table.idIndex[id];
    }
    findWhere(props){
        return this.table.records.filter((record) => {
            return compareObjects(record, props);
        })
    }
    where(key){
        return new Query(key, this.table);
    }
    insert(record){
        const data = this.table.insert(record);
        this.db.trigger(this.table.name, 'insert', data);
    }
    listen(operation, cb){
        this.db.listeners[this.table.name][operation].push(cb);
    }
}

function compareObjects(record, props){
    const propKeys = Object.keys(props);
    const result = propKeys.reduce((acc, key) => {
        const testValue = props[key];
        const recordValue = record[key];
        if(Array.isArray(testValue)){
            throw new Error('The method findWhere only works with key/value properties.');
        } else if(typeof testValue === 'object'){
            return acc && compareObjects(recordValue, testValue);
        } else {
            return acc && testValue === recordValue;
        }
    }, true);
    return result;
}

module.exports = Cursor;
