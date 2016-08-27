class OpalString {
  constructor (data) {
    this.data = data
  }
  validate () {
    if (typeof this.data !== 'string') {
      throw new Error(`Value of type ${typeof data} incorrect for property with type "string".`)
    }
  }
  equals (value) {
    return this.data === value
  }
}

class OpalNumber {
  constructor (data) {
    this.data = data
  }
  validate () {
    if (typeof this.data !== 'number') {
      throw new Error(`Value of type ${typeof this.data} incorrect for property with type "number".`)
    }
  }
  equals (value) {
    return this.data === value
  }
  lessThan (value) {
    return this.data < value
  }
  greaterThan (value) {
    return this.data > value
  }
}

class OpalArray {
  constructor (data) {
    this.data = data
  }
  validate () {
    if (!Array.isArray(this.data)) {
      throw new Error(`Value of type ${typeof this.data} incorrect for property with type "array".`)
    }
  }
  contains (value) {
    return this.data.indexOf(value) >= 0
  }
  equals (value) {
    for (let i = this.data.length, l = value.length; i < l; i++) {
      if (this.data[i] !== value[i]) {
        return false
      }
    }
    return true
  }
}

module.exports = {
  OpalString,
  OpalNumber,
OpalArray}
