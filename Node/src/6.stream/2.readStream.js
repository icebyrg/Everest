const fs = require('fs')
const path = require('path')
const ReadStream = require('./ReadStream')

// const rs = fs.createReadStream(path.resolve(__dirname, 'test.md'), {
const rs = new ReadStream(path.resolve(__dirname, 'test.md'), {
  flags: 'r', // fs.open(flags)
  encoding: null, // 表示读取的编码就是buffer格式
  mode: 0o666,
  autoClose: true, // 关闭文件 fs.close
  emitClose: true, // 触发关闭事件 this.emit('close')
  start: 0,
  end: 5, // 我要读取索引0-5的位置（6个位置）
  highWaterMark: 2, // 控制读取速率 单位字节 每次读取2个 默认64k
})
rs.on('open', function (fd) {
  console.log(fd)
})
const arr = []
rs.on('data', function (chunk) {
  arr.push(chunk)
  console.log(chunk)
  rs.pause() // 暂停读取操作 此时可以消费读取到的数据
})
rs.on('end', function () {
  console.log(Buffer.concat(arr).toString())
})
// rs.on('close', function () {
//   console.log('close')
// })
rs.on('error', function (err) {
  console.log('error')
})

setInterval(() => {
  rs.resume()
}, 1000)

// 可读流都拥有 on('data') on('end')
// open&close是针对文件的 不属于可读流
// tcp 就没有open&close
