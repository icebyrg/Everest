const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    // default status
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    const resolve = (value) => {
      // only at pending status can we change status
      if (this.status === PENDING)
        this.value = value
      this.status = FULFILLED
    }
    const reject = (reason) => {
      if (this.status === PENDING)
        this.reason = reason
      this.status = REJECTED
    }
    try {
      // equal to reject if executor throw error
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
  }
}

module.exports = Promise
