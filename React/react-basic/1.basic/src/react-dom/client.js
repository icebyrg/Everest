import { REACT_TEXT } from '../constant'

/**
 * 把虚拟DOM变成真实DOM并插入到container容器里
 * @param {*} vdom
 * @param {*} container
 */
function mount(vdom, container) {
  // 传进去虚拟DOM 返回真实DOM
  const newDOM = createDOM(vdom)
  container.appendChild(newDOM)
}

// 把虚拟DOM变成真实DOM
function createDOM(vdom) {
  const { type, props, children } = vdom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props)
  } else if (typeof type === 'function') {
    return mountFunctionComponent(vdom)
  } else {
    dom = document.createElement(type)
  }
  if (props) {
    updateProps(dom, {}, props)
    if (props.children) {
      if (typeof props.children === 'object' && props.children.type) {
        // 如果只有一个儿子 并且是对象 把儿子变成真实DOM插入到DOM节点上
        mount(props.children, dom)
      } else if (Array.isArray(props.children)) {
        reconcileChildren(props.children, dom)
      }
    }
  }
  return dom
}

function mountFunctionComponent(vdom) {
  const { type, props } = vdom
  const renderVdom = type(props)
  return createDOM(renderVdom)
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i]
    mount(childVdom, parentDOM)
  }
}

/**
 * 更新DOM元素的属性
 * 1.把新的属性全部赋上去
 * 2.把老的属性在新的属性对象中没有的属性移除掉
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
    // children属性会在后面单独处理
    if (key === 'children') {
      continue
    } else if (key === 'style') {
      // 把样式对象上的所有属性更新到真实DOM上
      let styleObject = newProps[key]
      for (const attr in styleObject) {
        dom.style[attr] = styleObject[attr]
      }
    } else if (/^on[A-Z].*/.test(key)) {
      dom[key.toLowerCase()] = newProps[key]
    } else {
      // 如果是其他属性 则直接赋值
      dom[key] = newProps[key]
    }
  }
  for (let key in oldProps) {
    if (!newProps.hasOwnProperty(key)) {
      dom[key] = null
    }
  }
}

class DOMRoot {
  constructor(container) {
    this.container = container
  }
  render(vdom) {
    mount(vdom, this.container)
  }
}

function createRoot(container) {
  return new DOMRoot(container)
}

const ReactDOM = {
  createRoot,
}

export default ReactDOM
