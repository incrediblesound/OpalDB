class Query {
    constructor(key, table){
        this.key = key;
        this.table = table;
    }
    contains(item){
        return this.table.records.filter((record) => {
            return contains(record[this.key], item);
        })
    }
}

function contains(array, item){
    for(let i = 0, l = array.length; i < l; i++){
        if(array[i] === item){
            return true;
        }
    }
    return false;
}

module.exports = Query;
