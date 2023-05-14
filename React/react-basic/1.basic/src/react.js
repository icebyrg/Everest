import { REACT_ELEMENT } from './constant'
import { wrapToVdom } from './utils'
/**
 * 根据参数 返回一个React元素
 * @param {*} type 元素的类型 div span p
 * @param {*} config 配置对象 className style
 * @param {*} children 后面所有参数都是children children可能有也可能没有 可能有一个也可能有多个
 */
function createElement(type, config, children) {
  let ref
  let key
  if (config) {
    delete config.__source
    delete config.__self
    ref = config.ref // 用来引用此元素的
    delete config.ref
    key = config.key // key是用来标记一个父亲的儿子的唯一性的
    delete config.key
  }
  let props = { ...config }
  // 如果参数数量大于3 说明有儿子 并且儿子数量大于一个
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
  } else if (arguments.length === 3) {
    // 如果等于3 那就是只有一个儿子
    props.children = wrapToVdom(children)
  }
  return {
    $$typeof: REACT_ELEMENT, // 默认是React元素类型
    type, // 元素的类型 div span p
    props, // 配置对象 className style children
    ref, // 用来引用此元素的
    key, // key是用来标记一个父亲的儿子的唯一性的
  }
}

const React = {
  createElement,
}
export default React
