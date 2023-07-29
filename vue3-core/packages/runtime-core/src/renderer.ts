import { ShapeFlags } from '@vue/shared'
import { isSameVnode } from './createVNode'

export function createRenderer(options) {
  let {
    insert: hostInsert,
    remove: hostRemove,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    patchProp: hostPatchProp,
  } = options
  // 挂载所有子节点 子节点不一定是元素 还有可能是组件
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      // 递归调用patch方法 创建元素
      patch(null, children[i], container)
    }
  }
  const unmountChildren = (children) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])
    }
  }
  const unmount = (vnode) => {
    // 后面要卸载的元素 可能不是元素
    hostRemove(vnode.el)
  }
  const mountElement = (vnode, container, anchor) => {
    const { type, props, shapeFlag, children } = vnode
    // 先创建父元素
    let el = (vnode.el = hostCreateElement(type))
    // 给父元素增添属性
    if (props) {
      for (let key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    // 区分子节点类型 挂载子节点
    if (ShapeFlags.ARRAY_CHILDREN & shapeFlag) {
      mountChildren(children, el)
    } else {
      hostSetElementText(el, children)
    }
    hostInsert(el, container, anchor) // 将元素插入到父节点中
  }
  const patchProps = (oldProps, newProps, el) => {
    for (let key in newProps) {
      // 用新的生效
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    // 老的里面有 新的没有 则删除
    for (let key in oldProps) {
      if (!(key in newProps)) {
        hostPatchProp(el, key, oldProps[key], null)
      }
    }
  }
  const patchChildren = (n1, n2, el) => {
    // 比较前后两个节点的差异
    let c1 = n1.children // 老儿子
    let c2 = n2.children // 新儿子

    let prevShapeFlag = n1.shapeFlag // 上一次
    let shapeFlag = n2.shapeFlag // 新的一次
    // 文本 数组 空 = 9种

    // 文本->数组 文本删除掉 换成数组
    // (文本->空 清空文本 文本->文本 用新文本换掉老的文本)
    // (数组->文本 移除数组、换成文本 数组->空)
    // 数组->数组 （diff）
    // 空->文本 更新文本
    // 空->数组 挂载数组

    // (空->空 无需处理)
    // ----
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // new is text, old is array, so take replacement
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1)
      }
      // new is text, old is text or null, take replacement
      if (c1 !== c2) {
        // text has changed
        hostSetElementText(el, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // diff algorithm
          patchKeyedChildren(c1, c2, el)
        } else {
          // old is array, new is null
          unmountChildren(c1)
        }
      } else {
        // old is text
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(el, '')
        }
        // new is array, than mount it
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, el)
        }
      }
    }
  }
  const patchKeyedChildren = (c1, c2, el) => {
    // can be optimized: regular dom operation 1) around add; around delete
    // if not optimized: circulate compare c1 c2 difference
    // from start
    let i = 0 // header pointer
    let e1 = c1.length - 1
    let e2 = c2.length - 1

    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }
    // i, e1, e2
    // from end
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      e1--
      e2--
    }
    // how to know new is more than old? how to know there is new element
    // i > e1 means new is longer than old, so there is added
    if (i > e1) {
      if (i <= e2) {
        // i-e2 is added part
        while (i <= e2) {
          // after e2 is null means add after
          // after e2 is not null means compared left, so add before
          const nextPos = e2 + 1
          const anchor = c2[nextPos]?.el
          patch(null, c2[i], el, anchor) // how to set anchor
          i++
        }
      }
    } else if (i > e2) {
      // old is more than new
      while (i <= e1) {
        unmount(c1[i])
        i++
      }
    }
    console.log(i, e1, e2)

    let s1 = i
    let s2 = i
    // take new element into map, find it in old one
    const keyToNewIndexMap = new Map()
    for (let i = s2; i <= e2; i++) {
      const child = c2[i]
      keyToNewIndexMap.set(child.key, i) // no key is undefined
    }
    // searching in old for whether new has it, no means old is deleted
    const toBePatch = e2 - s2 + 1
    const newIndexToOldIndexMap = new Array(toBePatch).fill(0)
    for (let i = s1; i <= e1; i++) {
      const child = c1[i]
      let newIndex = keyToNewIndexMap.get(child.key)
      if (newIndex == undefined) {
        unmount(child)
      } else {
        // a b c d
        // b a e f
        newIndexToOldIndexMap[newIndex - s2] = i + 1 // default is 0
        // new and old both have, need diff them for attributes and sons
        patch(child, c2[newIndex], el) // only compared for attributes, also need to move position
      }
    }
    console.log(newIndexToOldIndexMap) // which elements doesn`t need moving
    // [5,3,4,0]->[1,2] find out fixed elements based on marker, match index in reversed iteration and skip it
    // [5,3,8,0,4,6,7]->[1,4,5,6] this is index array

    // how to know which elements need to add which needs to move
    // reversed insertion

    // inside array is old relations
    for (let i = toBePatch - 1; i >= 0; i--) {
      // 3
      const anchorIndex = s2 + i
      const child = c2[anchorIndex]
      const insertAnchor = c2[anchorIndex + 1]?.el
      if (newIndexToOldIndexMap[i] === 0) {
        // virtual dom has been created
        patch(null, child, el, insertAnchor)
      } else {
        // raw reversed insertion - longest increasing subsequence
        hostInsert(child.el, el, insertAnchor)
      }
      console.log(child)
    }

    console.log(keyToNewIndexMap)

    // i = 0; e1 = 8; e2 = 7
    // a b c d e h q f g
    // a b c m n q f g

    // 3 5 4

    // a, b, c        i, e1, e2
    // a, b, c, d     3, 2 , 3
    // a, b, c
    // d, a, b, c     0, -1, 0

    // a, b, c, d, e  i, e1, e2
    // a, b, c        3, 4 , 2
    // d, e, a, b, c  0, 1 , -1
    // a, b, c
  }
  const patchElement = (n1, n2, container) => {
    // 更新逻辑
    let el = (n2.el = n1.el)
    patchProps(n1.props || {}, n2.props, el)
    patchChildren(n1, n2, el)
  }
  // patch方法每次更新都会重新执行
  const patch = (n1, n2, container, anchor = null) => {
    // n1和n2是不是相同的节点 如果不是相同节点 直接删掉换新的
    if (n1 && !isSameVnode(n1, n2)) {
      // 不是初始化 意味着更新
      unmount(n1)
      n1 = null // 删除之前的 继续走初始化流程
    }
    if (n1 == null) {
      // 初始化逻辑
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2, container)
    }
  }
  // 此方法并不关心options是谁提供的
  return {
    render(vnode, container) {
      // 根据vdom和容器 通过vdom创建真实dom插入到容器中
      if (vnode == null) {
        // 执行卸载逻辑
        unmount(container._vnode) // 删掉容器上对应的dom元素
      } else {
        const prevVnode = container._vnode || null
        const nextVnode = vnode
        patch(prevVnode, nextVnode, container)
        container._vnode = vnode // 第一次渲染的虚拟节点
      }
    },
  }
}
