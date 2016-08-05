class Schema {
    constructor(layout){
        this.layout = layout;
        this.data = null;
        this.beforeSave = null;
    }
    validate(data){
        if(recordIsValid(data, this.layout)){
            this.data = data;
        }
    }
}

function isString(value){
    return typeof value === 'string';
}

function isArray(value){
    return Array.isArray(value);
}

function isNumber(value){
    return typeof value === 'number';
}

function isObject(value){
    return !Array.isArray(value) && typeof value === 'object';
}

const isValidMap = {
    'STRING': isString,
    'NUMBER': isNumber,
    'ARRAY': isArray,
}

function recordIsValid(record, layout){
    const layoutKeys = Object.keys(layout);
    layoutKeys.forEach((key) => {
        const recordValue = record[key];
        const layoutValue = layout[key];
        if(!recordValue){
            return; // fields are not required
        } else if(isObject(layoutValue)){
            return recordIsValid(recordValue, layoutValue);
        } else {
            if(!isValidMap[layoutValue](recordValue)){
                throw new Error(`Record is invalid. Value ${recordValue} is not of type ${layoutValue}`);
            }
        }
    })
    return true;
}

module.exports = Schema;
