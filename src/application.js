const Database = require('./database/db')
const Schema = require('./schema/schema')
const model = require('./model/model')
const values = require('./schema/values')

module.exports = {
  Database,
  Schema,
  model,
  String: values.OpalString,
  Number: values.OpalNumber,
  Array: values.OpalArray
}
