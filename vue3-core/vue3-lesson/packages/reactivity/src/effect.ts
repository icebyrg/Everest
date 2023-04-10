export let activeEffect = undefined

export class ReactiveEffect {
  // 默认会将fn挂载到类的实例上
  constructor(private fn) {}
  parent = undefined
  deps = [] // 我依赖了哪些列表
  run() {
    try {
      this.parent = activeEffect
      activeEffect = this
      return this.fn()
    } finally {
      activeEffect = this.parent
      this.parent = undefined
    }
  }
}

export function effect(fn) {
  // 创建一个响应式effect 并且让effect执行
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

// 结构示例：{ name: 'xxx' } : 'name' -> [ effect, effect ]
// 结构分析：weakMap : map : set

const targetMap = new WeakMap()
export function track(target, key) {
  // 让这个对象上的属性 记录当前的activeEffect
  if (activeEffect) {
    // 说明用户是在effect中使用的这个数据
    let depsMap = targetMap.get(target)
    // 如果没有创建映射表
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    // 如果有这个映射表 来查找一下有没有这个属性
    let dep = depsMap.get(key)
    // 如果没有set集合创建集合
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    // 如果有则看一下set中有没有这个effect
    let shouldTrack = !dep.has(activeEffect)
    if (shouldTrack) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep)
    }
  }
}

export function trigger(target, key, newValue, oldValue) {
  // 通过对象找到对应的属性 让这个属性对应的effect重新执行
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const dep = depsMap.get(key) // name 或者 age 对应的所有effect
  dep &&
    dep.forEach((effect) => {
      // 正在执行的effect 不要多次执行
      if (effect !== activeEffect) effect.run()
    })
}
