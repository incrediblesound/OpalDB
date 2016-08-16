const constants = require('../schema/constants')

function typeIsString(type){
  return type === constants.STRING
}

function typeIsArray(type){
  return type === constants.ARRAY
}

function typeIsNumber(type){
  return type === constants.NUMBER
}

class Query {
  constructor (key, table) {
    this.key = key
    this.table = table
  }
  lessThan(value){
    if(typeof value !== 'number'){
      throw new Error('Query "lessThan" called with non-number value.')
    }
    const type = this.table.schema.layout[this.key]
    if(!typeIsNumber(type)){
      throw new Error('Query "lessThan" may only be used with numbers.')
    }
    return this.table.records.filter((record) => {
      return record && record[this.key] < value
    })
  }
  greaterThan(value){
    if(typeof value !== 'number'){
      throw new Error('Query "greaterThan" called with non-number value.')
    }
    const type = this.table.schema.layout[this.key]
    if(!typeIsNumber(type)){
      throw new Error('Query "lessThan" may only be used with numbers.')
    }
    return this.table.records.filter((record) => {
      return record && record[this.key] > value
    })
  }
  equals (value) {
    const type = this.table.schema.layout[this.key]
    if(typeIsArray(type)){
      throw new Error('Query "equals" can not be used with ARRAY values.')
    }
    return this.table.records.filter((record) => {
      return record && record[this.key] === value
    })
  }
  contains (item) {
    const type = this.table.schema.layout[this.key]
    if(!typeIsNumber(type)){
      throw new Error('Query "contains" may be used only with ARRAY values.')
    }
    return this.table.records.filter((record) => {
      return record && contains(record[this.key], item)
    })
  }
}

function contains (array, item) {
  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] === item) {
      return true
    }
  }
  return false
}

module.exports = Query
