const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve(__dirname, 'test.md'), function (err, data) {
//   if (err) return console.log(err)
//   fs.writeFile(path.resolve(__dirname, 'copy.md'), data, function (err) {
//     console.log('write ok')
//   })
// })

// 文件的读写 如果从内存的视角 读文件是向内存中写入 写文件是从内存中读取出来

// 1. open 2. read point location 3. close

// flags
// r: read
// w: write
// a: append
// r+: throw error when not exist, capable of read or write
// w+: create file when not exist, capable of read or write
// permission pos, 0o is octonary
// permission combination
// 1 execute 2 write 4 read bit calculate
// 001|010->011
// 001
// 010
// 100
// 001|010|100->111=7(777 contains 3 types of users)
// chmod -R 777

function copy(source, target, cb) {
  const buf = Buffer.alloc(3)
  fs.open(source, 'r', function (err, rfd) {
    if (err) return cb(err)
    // 将这个文件中的数据读取到这个buffer中 从buffer的第0个开始写入 写入3个 读取的文件位置是0
    fs.open(target, 'w', function (err, wfd) {
      if (err) return cb(err)
      let readPosition = 0
      let writePosition = 0
      function close() {
        let i = 0
        function done() {
          if (++i === 2) {
            return cb()
          }
        }
        fs.close(rfd, done)
        fs.close(wfd, done)
      }
      function next() {
        fs.read(rfd, buf, 0, 3, readPosition, function (err, bytesRead) {
          if (err) return cb(err)
          if (bytesRead === 0) {
            return close()
          }
          readPosition += bytesRead
          // 将buffer的第0个位置开始3个字节写入到文件第0个字节位置
          fs.write(wfd, buf, 0, bytesRead, writePosition, function (err, written) {
            if (err) return cb(err)
            writePosition += written
            next()
          })
        })
      }
      next()
    })
  })
}

copy(path.resolve(__dirname, 'test.md'), path.resolve(__dirname, 'copy.md'), function () {
  console.log('copy ok')
})

// 缺点回调地狱（采用发布订阅方式 解耦代码）
// 读写的打开操作之间无关（开发两套api 分别针对读和写）
// 控制读取速率和写入速率 读一点写一点
// -》node中的流（控制速度 并且决定是否继续读取或者写入）
// gulp就是基于流的构建工具（控制速率防止淹没内存）
// 流->文件流（fs）
// 流->自己的流
// 流->压缩流
