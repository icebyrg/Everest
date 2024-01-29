import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// fs.readFile(resolve(__dirname, 'fileUrl.txt'), 'utf8', function (err, data) {
//   fs.readFile(resolve(__dirname, data), 'utf8', function (err, data) {
//     console.log(data)
//   })
// })

// use Promise to transtion async callback api to Promise
function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (err)
        return reject(err)
      resolve(data)
    })
  })
}

readFile(resolve(__dirname, 'fileUrl.txt'))
  .then((data) => {
    return readFile(resolve(__dirname, data))
  })
  .then((data) => {
    console.log(data)
  })

// use Promise to make logic into chain calling
// in Promise then fn can be called continuously

// callbacks passed in then fn has return value which can be used to decide result of next then call
// 2 types of return value:
// 1) Promise, if successed pass value to next then success, if failed pass to next then failure
