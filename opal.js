const Opal = require('./src/main');
const Schema = require('./src/schema');
const model = require('./src/model');

module.exports = {
    Database: Opal,
    Schema,
    model
};
