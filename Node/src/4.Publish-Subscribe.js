const fs = require('fs') // file system
const path = require('path')

let person = {}

let event = {
  _arr: [],
  on(callback) {
    // 把函数存起来
    this._arr.push(callback)
  },
  emit(...args) {
    // 发布就是把函数拿出来一个个执行
    this._arr.forEach((fn) => fn(...args))
  },
}
event.on(function (a) {
  // 每次读取成功后我就打印消息
  console.log('读取成功一次')
})
event.on(function (a) {
  if (Object.keys(person).length === 2) {
    console.log('当前已经读取完毕了')
  }
})

fs.readFile(path.resolve(__dirname, 'documents/name.txt'), 'utf8', function (err, data) {
  person.name = data
  event.emit(1)
})
fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
  person.age = data
  event.emit(2)
})

// a.txt (b.txt) -> b.txt(c.txt)
fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
  if (err) {
  }
  fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
    if (err) {
    }
    fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
      if (err) {
      }
      fs.readFile(path.resolve(__dirname, 'documents/age.txt'), 'utf8', function (err, data) {
        if (err) {
        }
        event.emit('data', data)
      })
    })
  })
})

// Promise.all可以直接支持多个异步请求 同时拿到返回结果
