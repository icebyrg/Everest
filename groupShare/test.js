let person = {
  name: 'John',
  get aliasName() {
    return '**' + this.name
  },
  set aliasName(value) {
    this.name = value
  },
}

const proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    console.log('取值', key)
    return Reflect.get(target, key, receiver)
    // return target[key]
  },
  set(target, key, value, receiver) {
    console.log('设置值', key, value)
    return Reflect.set(target, key, value, receiver)
    // return (target[key] = value)
  },
})

proxyPerson.aliasName

proxyPerson.name = '123312'

console.log(proxyPerson)
