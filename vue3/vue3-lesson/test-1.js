let person = {
  name: 'jw',
  get aliasName() {
    return '**' + this.name + '**' // this -> person
  },
  set aliasName(value) {
    this.name = value
  },
}

let proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    console.log('取值', key)
    return Reflect.get(target, key, receiver) // 类似于call
    // return target[key] // target是person person.aliasName
  },
})

// 假如我在视图中使用aliasName这个变量
// 在获取aliasName的时候 也希望让name属性也会触发get
proxyPerson.aliasName // 只触发了aliasName获取操作，没有触发name的操作
// 假如说我在页面中使用了aliasName，会有aliasName对应了页面，但是没有创造name和页面的关系

// 页面和数据是有对应关系的 数据变化了 要更新视图
proxyPerson.name = 'xxx'
