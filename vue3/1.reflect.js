import { isObject } from '@vue/shared'

export function reactive(target) {
  return createReactiveObject(target)
}

const person = {
  name: 'name',
  get aliasName() {
    return this.name + '---'
  },
}

const proxy = new Proxy(person, {
  get(target, key, receiver) {
    console.log(key)
    return Reflect.get(target, key, receiver)
    // return target[key]
  },
  set(target, key, value, receiver) {
    target[key] = value
    // return Reflect.set(target, key, receiver)
    return true
  },
})

console.log(proxy.aliasName)
