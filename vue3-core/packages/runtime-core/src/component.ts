import { reactive } from '@vue/reactivity'
import { initProps } from './componentProps'

export function createInstance(n2) {
  const instance = {
    // component instance, use it to record component attributes
    state: null,
    isMounted: false, // whether mounted successfully
    vnode: n2, // component`s virtual node
    subTree: null, // component rendered virtual node
    update: null, // component update function
    propsOptions: n2.type.props, // user passed props
    props: {},
    attrs: {},
    render: null,
    proxy: null, // like proxyRefs xxx.value -> state.xxx
  }
  return instance
}

export function setupComponent(instance) {
  let { type } = instance.vnode
  const publicProperties = {
    $attrs: (instance) => instance.attrs,
    $props: (instance) => instance.props,
  }
  instance.proxy = new Proxy(instance, {
    get(target, key) {
      const { state, props } = target
      if (key in state) {
        return state[key]
      } else if (key in props) {
        return props[key]
      }
      const getter = publicProperties[key]
      if (getter) {
        return getter(instance) // pass instance
      }
    },
    set(target, key, value) {
      const { state, props } = target
      if (key in state) {
        state[key] = value
        return true
      } else if (key in props) {
        // component can`t mutate attributes
        console.warn(`mutate prop ${key as string} not allowed, props are readonly.`)
        return false
      }
      return true
    },
  })
  initProps(instance, instance.props)
  const data = type.data
  if (data) {
    instance.state = reactive(type.data)
  }
  instance.render = type.render
}
