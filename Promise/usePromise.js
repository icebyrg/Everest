// 1. Promise is a class, use new Promise to create an instance
// 2. pass one parameter to constructor which is an executor function
// 3. executor function has two parameters resolve(value) reject(reason)
// 4. execute resolve makes Promise into success otherwise into failure
// 5. Promise has 3 states: pending fulfilled rejected
// 6. states can only be change once
// 7. every promise instance has a then function which takes 2 parameters: onfulfilled, onrejected
// 8. promise is neither success or failed if resolve is not called
// 9. abnormal is considered failure
// 10. after resolve cant be rejected and vice versa
// 11. executor will be executed immediately

const Promise = require('./promise')

const promise = new Promise((resolve, reject) => {
  // reject(new Error('this is an error'))
  // resolve('we succeed')
  console.log(1)
})

console.log(2)

promise.then((value) => {
  console.log('success', value)
}, (reason) => {
  console.log('failure', reason)
})
