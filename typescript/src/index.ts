// 给类本身添加属性和方法
function Decorator(target: any) {
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

function OverrideAnimal(target: any) {
  // 可以返回子类 这个子类用于重写父类
  return class extends target {
    eat() {
      super.eat()
      console.log('child eat')
    }
  }
}

function Enum(isEnum: boolean) {
  // decorator
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // descriptor: writable value enumerable configurable
    descriptor.enumerable = isEnum
    // console.log(target, key, descriptor)
    let original = descriptor.value
    descriptor.value = function (...args: any[]) {
      // 切片 装饰器
      console.log('eat prev')
      original.call(this, ...args)
      console.log('eat after')
    }
  }
}

function ValToUpper(target: any, key: string, descriptor: PropertyDescriptor) {
  let original = descriptor.set
  descriptor.set = function (newVal: string) {
    original?.call(this, newVal.toUpperCase())
  }
}

function ToUpper(target: any, key: string) {
  // vue2 observerable
  let value = ''
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    // 重写类中的属性
    get() {},
    set(v) {
      value = v
    },
  })
}

// 装饰器默认先执行更近的 向上执行
// @OverrideAnimal
// @Decorator
class Animal {
  private _value!: string
  @ToUpper
  private name: string = 'Mammal'
  @Enum(true) // 装饰器函数在修饰函数的成员的时候一定会执行
  eat() {
    console.log('parent eat')
  }
  get value() {
    return this._value
  }
  @ValToUpper
  set value(newVal) {
    this._value = newVal
  }
}

let animal = new Animal()
animal.value = 'abc'

console.log(animal)
