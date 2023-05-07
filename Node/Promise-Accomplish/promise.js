const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// 这个方法要考虑x是不是promise
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 正常情况下，x可能是一个promise，也可能是一个普通值 如果是普通值，直接resolve就可以了
  // 判断这个x是不是一个promise 而且不能用x instanceof Promise，要考虑别人的promise
  // 只有x是对象或者函数才有可能是promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
    } catch (e) {}
  } else {
    resolve(x) // 普通值直接成功即可
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = [] // then中的成功的回调
    this.onRejectedCallbacks = [] // then中的失败的回调
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      // 如果执行器抛出异常，直接调用reject 这个异常作为promise失败的原因
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    // 当状态为pending时，将成功和失败的回调存起来
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // 可扩展
        let x = onFulfilled(this.value) // AOP 切片编程
      })
      this.onRejectedCallbacks.push(() => {
        let x = onRejected(this.reason)
      })
    }
  }
}
module.exports = Promise
