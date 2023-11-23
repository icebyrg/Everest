// 异步逻辑 并发问题 Promise.all
const fs = require('fs')
const path = require('path')
// node中的回调函数 第一个参数永远是error error-first
const person = {}
// 通过哨兵变量来解决这类问题
fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', function (err, name) {
  console.log(name)
  person['name'] = name
})
fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8', function (err, age) {
  console.log(age)
  person['age'] = age
})
// 异步并发 我们最终需要一起获得到结果

let events = {
  _events: [],
  on(fn) {
    this._events.push(fn)
  },
  emit() {
    this._events.forEach((fn) => fn())
  },
}
events.on((person) => {
  if (Reflect.ownKeys(person).length === 2) {
    console.log(person)
  }
})
events.on(() => {
  console.log('读取了一个')
})
