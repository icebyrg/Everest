const Promise = require('./promise')
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功') // 发布
  }, 1000)
})
promise.then(
  (value) => {
    console.log('成功')
  },
  (reason) => {
    console.log('失败')
  }
)
promise.then(
  (value) => {
    console.log('成功')
  },
  (reason) => {
    console.log('失败')
  }
)
