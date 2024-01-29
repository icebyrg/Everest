function sum1(a, b, c) {
  return a + b + c
}
sum1(1, 2, 3)

function sum2(x) {
  return function c(y) {}
}

// 柯里化的要求就是必须转成单参数的传入 (1)(2)(3) 标准的柯里化
// 偏函数 就是先固定一些参数 之后传入其他的函数 (1, 2)(3)
// 在开发的时候 我们不区分偏函数和柯里化函数
// 转化成了单一的函数之后 会让函数颗粒度变得更低
function sum3(x) {
  return function (y) {
    return function (z) {}
  }
}
const sum31 = sum3(1) // 我们可以通过一个范围较大的函数 衍生出小函数 可以通过组合来使用
sum3(2)(3)

function isType(typing, val) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`
}

// 固定的参数我们可以缓存起来 可以利用柯里化来实现
console.log(isType('String', 'hello'))
console.log(isType('String', 100))
console.log(isType('String', true))

const _ = require('lodash')

const curriedIsType = _.curry(isType)
const isString = curriedIsType('String')
console.log(isString('hello'))
console.log(isString(100))

function curry(...args) {
  const curried = (...args) => {}
}

function double(num) {
  return num * 2
}
function toFixed(num) {
  return num.toFixed(2)
}
function addPrefix(str) {
  return `$${str}`
}

function flowRight(...fns) {
  if (fns.length === 1) {
    // 只有一个函数就不组合了
    return fns[0]
  }
  return fns.reduceRight(
    (a, b) =>
      (...args) =>
        b(a(...args)),
  )
}

const composed = flowRight(addPrefix, toFixed, double)
const r = composed(100000)
console.log(r)
