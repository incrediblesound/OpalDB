const Opal = require('./src/main');
const Schema = require('./src/schema');
const Model = require('./src/model');

module.exports = {
    Database: Opal,
    Schema,
    Model
};
