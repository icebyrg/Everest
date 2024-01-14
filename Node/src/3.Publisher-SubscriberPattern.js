// Publisher-Subscriber Pattern, each times finished read we can do something
import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 1. after read all attribtues are executed
// 2. after read each attribute
class EventEmitter {
  #arr = [] // # is es13 private variable
  #person = {}
  on(callback) {
    this.#arr.push(callback) // intermediator stores subscribed fn
  }
  emit(key, value) {
    this.#person[key] = value
    this.#arr.forEach((fn) => fn(this.#person))
  }
}
const events = new EventEmitter()

events.on((person) => {
  console.log(person, 'read once')
})
events.on((person) => {
  if (Reflect.ownKeys(person).length === 2) {
    console.log(person, 'read done')
  }
})

fs.readFile(resolve(__dirname, 'age.txt'), 'utf-8', function (err, data) {
  events.emit('age', data)
})

fs.readFile(resolve(__dirname, 'name.txt'), 'utf-8', function (err, data) {
  events.emit('name', data)
})

// publish(emit) & subscribe(on) to decompose(no relation between them) introduce an intermediator
// Many-to-Many relationship

// Observer Pattern: Observer & Observable/Subject
// One-to-Many relationship: internal has Publisher-Subscriber
