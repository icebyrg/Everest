// 高阶函数的概念
// 1）一个函数返回一个函数 那么这个函数就是高阶函数
// 2）一个函数的参数是一个函数 那么这个函数也可以称之为高阶函数

// 高阶函数 是函数式编程的核心概念
// 1）extend fn logic without compromise original fn
function coreFunction(a, b, c) {
  console.log(a, b, c)
}

Function.prototype.before = function (callback) {
  return (...args) => {
    // no this arguments prototype
    callback() // extend fn
    this(...args) // core fn
  }
}

const enhanceCoreFunction = coreFunction.before(() => {
  console.log('before')
})

enhanceCoreFunction(1, 2, 3)

// 2) preset paramters
function sum(a, b, c) {
  return a + b + c
}
function apply(fn, ...presetArgs) {
  return function (...args) {
    return fn(...presetArgs, ...args)
  }
}
const add12 = apply(sum, 1, 2)
console.log(add12(3))
