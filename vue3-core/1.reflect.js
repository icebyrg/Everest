const person = {
  name: 'jw',
  get aliasName() {
    return `**${this.name}**` // this -> person
  },
  set aliasName(value) {
    this.name = value
  },
}

const proxyPerson = new Proxy(person, {
  // person, 'aliasName', proxyPerson
  get(target, key, receiver) {
    console.log('取值', key)
    return Reflect.get(target, key, receiver) // 类似于call
    // return target[key] // target是person person.aliasName
  },
})

// 假如我在视图中使用aliasName这个变量
// 在获取aliasName的时候 也希望让name属性也会触发get
console.log(proxyPerson.aliasName) // 只触发了aliasName获取操作，没有触发name的操作
// 假如说我在页面中使用了aliasName，会有aliasName对应了页面，但是没有创造name和页面的关系

// 页面和数据是有对应关系的 数据变化了 要更新视图
proxyPerson.name = 'xxx'

console.log(proxyPerson.aliasName)

proxyPerson.aliasName = 'zzz'
console.log(proxyPerson.name)

// 假如在页面中只使用过proxyPerson.aliasName，而由于被代理的person中aliasName的取值实际要依赖于person.name，使用Reflect.get可以到达这个「深度」依赖收集的效果
