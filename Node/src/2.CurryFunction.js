// 函数的柯里化 把一个函数拆分成多个小的函数 每一个函数的参数只能有一个
// 偏函数 参数可以不是一个的柯里化函数
// 正常来编写代码 我们把偏函数也称之为柯里化函数
// 返回了一个函数 所以也是高阶函数

function fn(a, b, c) {}

// 判断类型 Object.prototype.toString.call()
// constructor
// typeof
// instanceof
// function isType(val, typing) {
//   // 判断某个变量是不是某个类型 [xxx Object]
//   return Object.prototype.toString.call(val).slice(8, -1) === typing
// }
// // 判断某个变量是不是一个字符串
// console.log(isType('hello', 'String'))
// console.log(isType('abc', 'String'))

// 通过高阶函数可以缓存变量
// function isType(typing) {
//   // typing 保存到了这个作用域下
//   return (val) => {
//     // 定义
//     return Object.prototype.toString.call(val).slice(8, -1) === typing
//   }
// }
// // 闭包 定义函数的作用域和执行函数的作用域不是同一个 就会产生闭包
// let isString = isType('String')
// console.log(isString('abc'))

// 自己动手实现一个通用的柯里化函数

function sum(a, b, c) {
  return a + b + c
}
function curry(func) {
  // 柯里化函数一定是高阶函数
  const curried = (...args) => {
    // 用户本次执行的时候传递的参数
    if (args.length < func.length) {
      return (...others) => curried(...args, ...others)
    } else {
      return func(...args)
    }
  }
  return curried
}
let curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3))

function isType(typing) {
  return Object.prototype.toString.call(val).slice(8, -1) === typing
}
let isString = curry(isType)('String')
