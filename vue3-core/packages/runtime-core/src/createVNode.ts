// 类型 属性 孩子
import { ShapeFlags, isNumber, isObject, isString } from '@vue/shared'

export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')

export function isVNode(val) {
  return !!(val && val.__v_isVNode)
}
export function convert(child) {
  if (isString(child) || isNumber(child)) {
    return createVNode(Text, null, child)
  } else {
    return child
  }
}
export function normalizeChildren(children) {
  return children.map(convert)
}
export function isSameVnode(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key
}
export function createVNode(type, props, children = null) {
  // like React.createElement
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT // 这个是元素
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT // 这个是组件
    : 0
  const vnode = {
    shapeFlag,
    __v_isVNode: true,
    type,
    props,
    key: props && props.key,
    el: null, // 每个虚拟节点都对应一个真实节点 用来存放真实节点的 后续更新的时候会产生新的虚拟节点 比较差异更新真实 DOM
    children,
  }
  if (children) {
    let type = 0
    if (Array.isArray(children)) {
      vnode.children = normalizeChildren(children)
      type = ShapeFlags.ARRAY_CHILDREN
    } else {
      vnode.children = String(children)
      type = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= type
  }
  return vnode
}

// 创建元素的时候 createElement() children.forEach(child=>createElement(child))
// createElement() text: element.innerHTML
// 对象可能是组件 还有可能是其他类型
// if(isObject())
