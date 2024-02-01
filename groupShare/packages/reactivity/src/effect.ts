export let activeEffect = undefined

export class ReactiveEffect {
  constructor(private fn) {}
  parent = undefined
  deps = []
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
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

const targetMap = new WeakMap()

export function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    let shouldTrack = !dep.has(activeEffect)
    if (shouldTrack) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep)
    }
  }
}

export function trigger(target, key, value, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  dep &&
    dep.forEach((effect) => {
      if (effect !== activeEffect) {
        effect.run()
      }
    })
}
