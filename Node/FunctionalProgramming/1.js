const arr = [1, 2, 3, 4, 5]
// 面向过程
// function calc() {
//   let sum = 0
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i]
//   }
// }

// 面向对象 要维护状态和行为
// class Calc {
//   constructor() {
//     this.sum = 0
//   }
//   add(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       this.sum += arr[i]
//     }
//   }
// }

// const calc = new Calc()
// calc.add(arr)

// 高阶函数 + 纯函数 （输入相同输出就相同）
// 每个函数抽象了运算的过程 没有this Vue3所有的响应式api setup(){}
const total = arr.reduce((acc, cur) => acc + cur, 0)

// 高阶函数的概念 满足1 或 2 都是高阶函数
// 1)
function fn1(cb) {
  // cb=函数 fn就是高阶函数
}
// 2)
function fn2() {
  // 高阶函数
  return function () {}
}

// 高阶函数 参数是函数的情况 函数式编程就是对运算过程的抽象
Array.prototype.reduce = function (callback, startVal) {
  // 如果传递了开始的值 内部会从第一项开始遍历 如果没传 会从头开始循环 0,1
  let arr = this
  let acc = typeof startVal === 'undefined' ? arr[0] : startVal
  let sIndex = typeof startVal === 'undefined' ? 1 : 0
  for (let i = sIndex; i < arr.length; i++) {
    acc = callback(acc, arr[i])
  }
  return acc
}

// 切片编程 AOP 对我们原有的逻辑进行包装 但是不破坏原有的逻辑
function say(val) {
  console.log(val)
}

Function.prototype.before = function (callback) {
  // this = say
  return (...args) => {
    // newSay
    callback() // before say
    this() // say
  }
}
let newSay = say.before(() => {
  // before 高阶函数
  console.log('before say')
})
newSay('我说了一句话')

// 函数作为参数 多数都是对我们的原有函数进行扩展

// 函数作为返回值的情况
// 纯函数的好处 相同的输入 会有相同的输出 纯函数可以进行缓存
function exec(a, b) {
  console.log('runner~~~')
  return a + b
}

const _ = require('lodash') // 加载第三方模块
const resolver = (...args) => {
  return JSON.stringify(args)
}

function memoize(fn, resolver) {
  const cache = new Map()
  return function (...args) {
    typeof resolver === 'function' ? resolver(...args) : args[0]
    let result = cache.get(key)
    if (result == undefined) {
      result = fn(...args)
      cache.set(key, result)
    }
    return result // js的缓存
  }
}

let memoizedExec = _.memoize(exec, resolver) // resolver需要返回一个缓存的key
console.log(memoizedExec(1, 2))
console.log(memoizedExec(1, 2))

let newFn = _.after(2, function () {
  // promise all
  console.log('runner fn')
})
newFn()
newFn() // 超过运行次数2的时候 才会真正的执行
newFn()

// 闭包：真正的开发中 我们理解的闭包：词法作用域
function a() {
  // 当前定义的函数 记住了所在的词法作用域 b函数不在当前词法作用域中执行 此时就会产生闭包
  let c = 100 // 只要记住了这个词法作用域 就是闭包
  return function b() {
    console.log(c)
  }
}

let b = a()
b()
// 记住变量 after、memoize可以缓存 函数作为参数和返回值是函数的情况 我们可以进行缓存

// 点赞功能 如果点赞一次后 重复点赞无效

// 缓存 是一个纯函数

// exec(1, 2)
// exec(1, 2)
// exec(1, 2)

// let sum = 0
// function a() {}
