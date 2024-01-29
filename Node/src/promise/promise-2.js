const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    // transition promise into success
    this.status = PENDING // default is pending
    this.value = undefined // why successed
    this.reason = undefined // why failed
    this.onResolvedCallbacks = [] // store success callbacks
    this.onRejectedCallbacks = [] // store failure callbacks
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        // publisher
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    // transition promise into failure
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    }
    catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED)
      onFulfilled(this.value)

    if (this.status === REJECTED)
      onRejected(this.reason)

    if (this.status === PENDING) {
      // subscriber
      this.onResolvedCallbacks.push(() => {
        // extended
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

export default Promise
