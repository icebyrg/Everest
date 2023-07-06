import { isObject } from '@vue/shared'
import { mutableHandlers, ReactiveFlags } from './baseHandler'

export function reactive(target) {
  return createReactiveObject(target)
}

const reactiveMap = new WeakMap()

function createReactiveObject(target) {
  if (!isObject(target)) return
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  let existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, mutableHandlers)
  reactiveMap.set(target, proxy)
  return proxy
}

export function isReactive(source) {
  return !!(source && source[ReactiveFlags.IS_REACTIVE])
}

export function toReactive(source) {
  return isObject(source) ? reactive(source) : source
}
