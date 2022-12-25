function _classCallCheck(instance, constructor) {
  if (!(instance instanceof constructor)) {
    throw new Error('Class constructor cannot be invoked without new')
  }
}

function defineProperties(target, arr) {
  for (let i = 0; i < arr.length; i++) {
    Object.defineProperty(target, arr[i].key, {
      ...arr[i],
      configurable: true,
      enumerable: true,
      writable: true,
    })
  }
}

function _createClass(constructor, protoProperties, staticProperties) {
  if (protoProperties.length > 0) {
    defineProperties(constructor.prototype, protoProperties)
  }
  if (staticProperties.length > 0) {
    defineProperties(constructor, staticProperties)
  }
}

let Parent = (function () {
  function P() {
    _classCallCheck(this, P)
    this.name = 'Parent'
  }
  _createClass(
    P,
    [
      {
        key: 'eat',
        value: function () {
          console.log('eat')
        },
      },
      {
        key: 'drink',
        value: function () {
          console.log('drink')
        },
      },
    ],
    [
      {
        key: 'b',
        value: function () {
          return 2
        },
      },
    ]
  )
  return P
})()

function _inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype, {
    constructor: {
      value: subClass,
    },
  })

  Object.setPrototypeOf(subClass, superClass)
}

let Child = (function (Parent) {
  _inherits(C, parent)
  function C() {
    _classCallCheck(this, C)
    let obj = Parent.call(this)
    let that = this
    if (typeof obj === 'object') {
      that = obj
    }
    that.age = 9
    return that
  }
  return C
})(parent)
