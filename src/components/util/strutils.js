const utils = {
  judgeNull:function (value) {
    if (value == null || value == undefined) return true
    if (this.judgeString(value)) {
      if (value.trim().length == 0) return true
    } else if (this.judgeArray(value)) {
      if (value.length == 0) return true
    } else if (this.judgeObject(value)) {
      for (let name in value) return false
      return true
    }
    return false;
  },

  judgeNonNull:function(value){
    return !this.judgeNull(value);
  },

  judgeString:function(value) {
    return value != null && value != undefined && value.constructor == String
  },
  judgeNumber:function(value) {
    return value != null && value != undefined && value.constructor == Number
  },
  judgeBoolean:function(value) {
    return value != null && value != undefined && value.constructor == Boolean
  },
  judgeArray:function(value) {
    return value != null && value != undefined && value.constructor == Array
  },
  judgeObject:function(value) {
    return value != null && value != undefined && value.constructor == Object
  },
  judgeFunction:function(value) {
    return value != null && value != undefined && value.constructor == Function
  },
  mergeObject:function() {
    let newObject = {}
    for (let a = 0; a < arguments.length; a++) {
      let mergeObject = arguments[a]
      for (let prototype in mergeObject) {
        let mergeObjectPrototype = mergeObject[prototype]
        if (this.judgeObject(mergeObjectPrototype)) {
          newObject[prototype] = this.mergeObject({}, mergeObjectPrototype)
        } else if (this.judgeArray(mergeObjectPrototype) && this.judgeObject(mergeObjectPrototype[0])) {
          let newArray = []
          for (let b = 0; b < mergeObjectPrototype.length; b++) {
            newArray.push(this.mergeObject({}, mergeObjectPrototype[a]))
          }
          newObject[prototype] = newArray
        } else {
          newObject[prototype] = mergeObjectPrototype
        }
      }
    }
    return newObject
  },

  getTimestamp:function() {
    return Date.parse(new Date())
  },
  getClassName:function(params) {
    if (this.judgeNull(params)) return ''
    if (!this.judgeObject(params)) {
      console.error('expect object params')
      return ''
    }
    let className = ''
    for (var name in params) {
      if (params[name]) className += ' ' + name
    }
    return className.replace(/ /, '')
  }
};

export default utils