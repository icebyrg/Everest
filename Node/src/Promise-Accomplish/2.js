// 创建一个Promise的时候，需要传递一个executor执行器，执行器会立即执行
// 1. 特点：promise有三种状态，分别是pending(等待态)、fulfilled(成功态)、rejected(失败态)
// 2. 每个promise都有一个then方法，then方法中传递两个参数，一个是成功的回调，一个是失败的回调
// 3. resolve和reject是用来改变状态的
// 4. executor是立即执行的
// 5. promise一旦状态变化后不能再次改变
// 6. 如果new Promise的时候，executor函数中抛出异常，会走失败态
const Promise = require('./promise')
const promise = new Promise((resolve, reject) => {
  throw new Error('失败')
  setTimeout(() => {
    resolve('成功')
  }, 0)
})
promise.then(
  (value) => {
    console.log('成功')
  },
  (reason) => {
    console.log('失败')
  }
)
