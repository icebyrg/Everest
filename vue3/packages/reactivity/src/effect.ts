export let activeEffect = undefined

function cleanupEffect(effect) {
  let deps = effect.deps
  for (let i = 0; i < deps.length; i++) {
    deps[i].delete(effect)
  }
  effect.deps.length = 0
}

export class ReactiveEffect {
  parent = undefined
  constructor(public fn, public scheduler?) {}
  deps = []
  run() {
    try {
      this.parent = activeEffect
      activeEffect = this
      cleanupEffect(this)
      return this.fn()
    } finally {
      activeEffect = this.parent
      this.parent = undefined
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()
  const runner = _effect.run.bind(_effect)
  return runner
}
