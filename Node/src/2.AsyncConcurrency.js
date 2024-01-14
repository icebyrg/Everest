import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 1.traditionally we using callbacks to handle error and async
// const person = {} // global variable
// function cb(key, value) {
//   // enhance function
//   person[key] = value
//   if (Reflect.ownKeys(person).length === 2) {
//     // length is not fixed
//     console.log(person)
//   }
// }

// 2.use HOC to multiplexing and preset paramters
function after(times, cb) {
  let person = {}
  return (key, value) => {
    person[key] = value
    if (--times == 0) {
      cb(person)
    }
  }
}

const cb = after(2, (person) => {
  console.log(person)
})

// node is error first
fs.readFile(resolve(__dirname, 'age.txt'), 'utf-8', function (err, data) {
  cb('age', data)
})

fs.readFile(resolve(__dirname, 'name.txt'), 'utf-8', function (err, data) {
  cb('name', data)
})
