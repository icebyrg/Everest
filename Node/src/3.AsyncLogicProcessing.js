const fs = require('fs') // file system
const path = require('path')

// 异步（我们不能立刻拿到返回值 而是我可以继续做别的事情）和同步的区别
// 我（非阻塞）-> 小姑娘（你可以撤了，等我消息，决定了这个方法是异步的）
// 我（阻塞） -> 小姑娘（别挂电话，稍等我会告诉你 同步的）
// 同步阻塞 异步非阻塞
// console.log(path.resolve(__dirname, 'documents/name.txt'))
// node中的api 第一个参数都是err 意味着error-first 有限错误处理
let person = {}

function after(times, callback) {
  // 高阶函数来处理异步问题
  return function () {
    // out
    if (--times == 0) {
      callback()
    }
  }
}

let out = after(2, function () {
  // 只能等待两次都完成后才执行，过程丢失了
  console.log(person)
})
// 发布订阅模式
fs.readFile(path.resolve(__dirname, 'documents/name.txt'), 'utf8', function (err, data) {
  person.name = data
  out() // 发布
})
fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
  person.age = data
  out() // 发布
})
// 同步多个异步操作的返回值结果（Promise.all）
