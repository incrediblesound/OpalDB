const Schema = require('./schema');

class Table {
    constructor(name){
        this.name = name;
        this.records = [];
        this.idIndex = {};
        this.index = 0;
    }
    insert(record){
        if(!record.schema instanceof Schema){
            throw new Error('Record is not an instance of an Opal schema.');
        }
        if(record.beforeSave){
            record.beforeSave();
        }
        const data = record.data;

        this.idIndex[this.index] = data;
        this.records.push(data);
        this.index++;
        return data;
    }
}

module.exports = Table;
