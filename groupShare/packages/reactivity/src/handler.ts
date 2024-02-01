import { track, trigger } from './effect'
import { ReactiveFlag } from './reactive'

export const mutableHandlers = {
  get(target, key, receiver) {
    if (key === ReactiveFlag.IS_REACTIVE) {
      return true
    }
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    return res
  },
  set(target, key, value) {
    let oldValue = target[key]
    const r = Reflect.set(target, key, value)
    if (oldValue !== value) {
      trigger(target, key, value, oldValue)
    }
    return r
  },
}
