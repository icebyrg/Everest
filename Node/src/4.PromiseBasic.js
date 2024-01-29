// what is promise, which problem does it solve
// Promise is an object to process async operation
// Main character: solve async related problems

// 1. callback hell, callback in nesting makes code hard to maintain or understand
//  solution is using chain calling to expend nested logic

// 2. error handling, each callback needs to handle error individually unable to unify it
//  in promise we have catch to solve it

// 3. concurrency: traditionally using counter
//  in promise we have Promise.all Promise.race Promise.allSetteld

// the goal of Promise is to making async code easier to maintain

// Promise in basics
// 1. Promise has 3 states: pending fulfilled rejected
// 2. a fulfilled or rejected promise must not change states
// 3. each promise instance has a then function to take in 2 paramters: success and fail callbacks
// 4. when created each promise needs take in an executor which will be executed immediately, executor has 2 paramters: resolve & reject
// 5. pending can transition into success(resolve) or fail(reject/throw error)

import Promise from './promise/promise-1.js'
const promise = new Promise((resolve, reject) => {
  // resolve('success')
  // reject('error')
  throw new Error('error')
})
promise.then(
  (value) => {
    console.log('success callback', value)
  },
  (reason) => {
    console.log('fail callback', reason)
  },
)
