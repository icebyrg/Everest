import { trackEffects, triggerEffects } from './baseHandler'
import { activeEffect } from './effect'
import { toReactive } from './reactive'

export function ref(value) {
  return new RefImpl(value)
}

class RefImpl {
  _value
  dep = new Set()
  constructor(public rawValue) {
    this._value = toReactive(rawValue)
  }
  get value() {
    if (activeEffect) trackEffects(this.dep)
    return this._value
  }
  set value(newValue) {
    if (newValue !== this.rawValue) {
      this.rawValue = newValue
      this._value = toReactive(newValue)
      triggerEffects(this.dep)
    }
  }
}

class ObjectRefImpl {
  constructor(public object, public key) {}
  get value() {
    return this.object[this.key]
  }
  set value(val) {
    this.object[this.key] = val
  }
}

export function toRef(object, key) {
  return new ObjectRefImpl(object, key)
}

export function toRefs(object) {
  let res = {}
  for (let key in object) {
    res[key] = toRef(object, key)
  }
  return res
}
