
function opalModel(schema){
    return class {
        constructor(data){
            schema.validate(data);
            
            this.schema = schema;
            this.data = data;
        }
        onBeforeSave(cb){
            this.beforeSave = cb.bind(null, this.data);
        }
    }
}

module.exports = opalModel;
