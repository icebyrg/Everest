import { track, trigger } from './effect'
import { ReactiveFlags } from './reactive'

export const mutableHandlers = {
  // 这里的reveiver就是proxy
  get(target, key, receiver) {
    // 我们在使用proxy的时候要搭配reflect来使用，用来解决this问题
    // 取值的时候，让这个属性和effect产生关系
    // return target[key] 这样value里的内容没有被代理

    // effect - 对应属性；建立映射关系
    // console.log(activeEffect, key)

    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }

    const res = Reflect.get(target, key, receiver) // 类似于取属性用的call this从value改为proxy
    // 做依赖收集 记录属性和当前effect的关系「多对多」
    track(target, key)
    return res
  },
  set(target, key, value, receiver) {
    // 更新数据
    // target[key] = value
    // return true
    // 找到这个属性对应的effect让它执行
    let oldValue = target[key]

    const r = Reflect.set(target, key, value, receiver)

    if (oldValue !== value) {
      trigger(target, key, value, oldValue)
    }
    return r
  },
}
