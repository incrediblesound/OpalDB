const Schema = require('./schema');

class Table {
    constructor(name){
        this.name = name;
        this.records = [];
        this.idIndex = {};
        this.indexKeys = [];
        this.indexes = {}
        this.counter = 0;
    }
    insert(record){
        if(!record.schema || !(record.schema instanceof Schema)){
            throw new Error('Record is not an instance of an Opal schema.');
        }
        if(record.beforeSave){
            record.beforeSave();
        }
        const data = record.data;

        data.id = this.counter;
        this.idIndex[data.id] = data;
        this.indexKeys.forEach((key) => {
            this.indexes[key][data[key]] = this.indexes[key][data[key]] || [];
            this.indexes[key][data[key]].push(record);
        })
        this.records.push(data);
        this.counter++;
        return data;
    }
    createIndex(key){
        this.indexKeys.push(key);
        this.indexes[key] = {};
        this.records.forEach((record) => {
            this.indexes[key][record[key]] = this.indexes[key][record[key]] || []
            this.indexes[key][record[key]].push(record);
        })
    }
}

module.exports = Table;
