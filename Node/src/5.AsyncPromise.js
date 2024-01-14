// import Promise from './promise/promise-1.js'
import Promise from './promise/promise-2.js'

// Promise async handling
// promise could still be pending when called then fn, so we should store callbacks of success and failure, after states changed we execute it (which is publisher-subscriber)
// a Promise instance could be called then fn multiple times, after success or fail we have to execute it based on subscribe order

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

promise.then(
  function (value) {
    console.log('success callback1', value)
  },
  function (reason) {
    console.log('fail callback1', reason)
  }
)

promise.then(
  function (value) {
    console.log('success callback2', value)
  },
  function (reason) {
    console.log('fail callback2', reason)
  }
)
