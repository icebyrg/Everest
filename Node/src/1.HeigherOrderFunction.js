// 高阶函数的概念
// 1）一个函数返回一个函数 那么这个函数就是高阶函数
// 2）一个函数的参数是一个函数 那么这个函数也可以称之为高阶函数

function a() {
  return function () {}
}

function a(callback) {}
a(function () {})

function a(fn) {
  return function () {
    fn() // 两者都满足也是高阶函数
  }
}

function core(a, b, c) {
  // 我们希望对这个core进行封装
  console.log('核心逻辑', a, b, c)
}

// 切片编程
Function.prototype.before = function (fn) {
  // this 向上查找
  return (...args) => {
    // 箭头函数中是没有this的 没有原型 箭头函数没有arguments
    fn() // 做的其他逻辑
    this(...args) // AOP 切片增加额外的逻辑 在原有的逻辑中增添额外的逻辑
    // todo...
  }
}

const newCore = core.before(() => {
  console.log('我增添的额外逻辑')
})

newCore(1, 2, 3)
