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

function fetchStoredValue(record, key){
  if(!record){
    return false
  } else if(typeof key === 'string'){
    return record[key]
  } else if(Array.isArray(key)){
    return key.reduce((acc, curr) => {
      return acc[curr]
    }, record)
  }
}

function fetchTypeFromLayout(layout, key){
  if(Array.isArray(key)){
    return key.reduce((acc, curr) => {
      return acc[curr]
    }, layout)
  } else {
    return layout[key]
  }
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
    
    const type = fetchTypeFromLayout(this.table.schema.layout, this.key)
    if(!typeIsNumber(type)){
      throw new Error('Query "lessThan" may only be used with numbers.')
    }
    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key);
      return storedValue && storedValue < value
    })
  }
  greaterThan(value){
    if(typeof value !== 'number'){
      throw new Error('Query "greaterThan" called with non-number value.')
    }

    const type = fetchTypeFromLayout(this.table.schema.layout, this.key)
    if(!typeIsNumber(type)){
      throw new Error('Query "lessThan" may only be used with numbers.')
    }
    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key);
      return storedValue && storedValue > value
    })
  }
  equals (value) {
    const type = fetchTypeFromLayout(this.table.schema.layout, this.key)
    if(typeIsArray(type)){
      throw new Error('Query "equals" can not be used with ARRAY values.')
    }
    const storedValue = fetchStoredValue(record, this.key);
    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key);
      return storedValue && storedValue === value
    })
  }
  contains (item) {
    const type = fetchTypeFromLayout(this.table.schema.layout, this.key)
    if(!typeIsNumber(type)){
      throw new Error('Query "contains" may be used only with ARRAY values.')
    }
    return this.table.records.filter((record) => {
      const storedValue = fetchStoredValue(record, this.key);
      return storedValue && contains(storedValue, item)
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
