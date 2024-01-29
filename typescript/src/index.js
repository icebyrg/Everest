const __extends = (this && this.__extends) || (function () {
  let extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf
    || (Array.isArray({ __proto__: [] }) && function (d, b) { d.__proto__ = b })
    || function (d, b) {
      for (const p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p))
          d[p] = b[p]
      }
    }
    return extendStatics(d, b)
  }
  return function (d, b) {
    if (typeof b !== 'function' && b !== null)
      throw new TypeError(`Class extends value ${String(b)} is not a constructor or null`)
    extendStatics(d, b)
    function __() { this.constructor = d }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
})()
const __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
  const useValue = arguments.length > 2
  for (let i = 0; i < initializers.length; i++)
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg)

  return useValue ? value : void 0
}
const __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== 'function')
      throw new TypeError('Function expected'); return f
  }
  const kind = contextIn.kind; const key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value'
  const target = !descriptorIn && ctor ? contextIn.static ? ctor : ctor.prototype : null
  const descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {})
  let _; let done = false
  for (let i = decorators.length - 1; i >= 0; i--) {
    const context = {}
    for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p]
    for (var p in contextIn.access) context.access[p] = contextIn.access[p]
    context.addInitializer = function (f) {
      if (done)
        throw new TypeError('Cannot add initializers after decoration has completed'); extraInitializers.push(accept(f || null))
    }
    const result = (0, decorators[i])(kind === 'accessor' ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context)
    if (kind === 'accessor') {
      if (result === void 0)
        continue
      if (result === null || typeof result !== 'object')
        throw new TypeError('Object expected')
      if (_ = accept(result.get))
        descriptor.get = _
      if (_ = accept(result.set))
        descriptor.set = _
      if (_ = accept(result.init))
        initializers.push(_)
    }
    else if (_ = accept(result)) {
      if (kind === 'field')
        initializers.push(_)
      else descriptor[key] = _
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor)
  done = true
}
const __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i)
        ar[i] = from[i]
      }
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from))
}
const _this = this
// 给类本身添加属性和方法
function Decorator(target) {
  target.type = 'Animal'
  target.getType = function () {
    return this.type
  }
  target.prototype.eat = function () {
    console.log('eat')
  }
  target.prototype.drink = function () {
    console.log('drink')
  }
}
function OverrideAnimal(target) {
  // 可以返回子类 这个子类用于重写父类
  return /** @class */ (function (_super) {
    __extends(class_1, _super)
    function class_1() {
      return _super !== null && _super.apply(this, arguments) || this
    }
    class_1.prototype.eat = function () {
      _super.prototype.eat.call(this)
      console.log('child eat')
    }
    return class_1
  }(target))
}
function Enum(isEnum) {
  // decorator
  return function (target, key, descriptor) {
    // descriptor: writable value enumerable configurable
    descriptor.enumerable = isEnum
    // console.log(target, key, descriptor)
    const original = descriptor.value
    descriptor.value = function () {
      const args = []
      for (let _i = 0; _i < arguments.length; _i++)
        args[_i] = arguments[_i]

      // 切片 装饰器
      console.log('eat prev')
      original.call.apply(original, __spreadArray([this], args, false))
      console.log('eat after')
    }
  }
}
function ValToUpper(target, key, descriptor) {
  const original = descriptor.set
  descriptor.set = function (newVal) {
    original === null || original === void 0 ? void 0 : original.call(this, newVal.toUpperCase())
  }
}
// 装饰器默认先执行更近的 向上执行
// @OverrideAnimal
// @Decorator
const Animal = (function () {
  let _a
  const _instanceExtraInitializers = []
  let _eat_decorators
  let _set_value_decorators
  return _a = /** @class */ (function () {
    function Animal() {
      this._value = (__runInitializers(this, _instanceExtraInitializers), void 0)
    }
    Animal.prototype.eat = function () {
      console.log('parent eat')
    }
    Object.defineProperty(Animal.prototype, 'value', {
      get() {
        return this._value
      },
      set(newVal) {
        this._value = newVal
      },
      enumerable: false,
      configurable: true,
    })
    return Animal
  }()),
  (function () {
    _eat_decorators = [Enum(true)]
    _set_value_decorators = [ValToUpper]
    __esDecorate(_a, null, _eat_decorators, { kind: 'method', name: 'eat', static: false, private: false, access: { has(obj) { return 'eat' in obj }, get(obj) { return obj.eat } } }, null, _instanceExtraInitializers)
    __esDecorate(_a, null, _set_value_decorators, { kind: 'setter', name: 'value', static: false, private: false, access: { has(obj) { return 'value' in obj }, set(obj, value) { obj.value = value } } }, null, _instanceExtraInitializers)
  })(),
  _a
}())
const animal = new Animal()
animal.value = 'abc'
console.log(animal)
