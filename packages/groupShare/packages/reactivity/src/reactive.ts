import { isObject } from '@vue/shared'
import { mutableHandlers } from './handler'

export const enum ReactiveFlag {
  IS_REACTIVE = '__v_isReactive',
}

const reactiveMap = new WeakMap()

export function reactive(target) {
  if (!isObject(target)) return target
  let existingProxy = reactiveMap.get(target)
  if (existingProxy) return existingProxy
  if (target[ReactiveFlag.IS_REACTIVE]) return target
  const proxy = new Proxy(target, mutableHandlers)
  reactiveMap.set(target, proxy)
  return proxy
}
