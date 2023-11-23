// 1.Promise是一个类 使用的时候需要new Promise来产生一个promise实例
// 2.构造函数中需要传递一个参数 executor
// 3.executor函数中有两个参数 resolve(value) reject(reason)
// 调用resolve会让promise变成成功，调用reject会变成失败 pending等待态 fulfilled成功态 rejected失败态
// 一旦状态发生变化后 不能再修改状态
// 4.每个promise实例都有一个then方法 会有两个参数 onfulfilled onrejected
// 5.如果不调用resolve 此时promise不会成功也不会失败 （如果发生异常也会认为是失败）
// 6.resolve之后 不能reject 相反也是
// 7.executor是立即执行的

const Promise = require('./history/Promise-1')
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok')
    reject('failed')
  }, 1000)
})

promise.then(
  (value) => {
    console.log('成功1', value)
  },
  (reason) => {
    console.log('失败1', reason)
  }
)
promise.then(
  (value) => {
    console.log('成功2', value)
  },
  (reason) => {
    console.log('失败2', reason)
  }
)
