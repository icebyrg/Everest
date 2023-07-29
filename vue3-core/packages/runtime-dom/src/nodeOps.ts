export const nodeOps = {
  insert(el, parent, anchor) {
    // <div id="app"><span></span></div>
    // 插入到某个元素前面 如果不传递anchor则是直接appendChild元素
    return parent.insertBefore(el, anchor || null)
  },
  remove(el) {
    const parent = el.parentNode
    if (parent) {
      return parent.removeChild(el)
    }
  },
  createElement(type) {
    return document.createElement(type)
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(node, text) {
    return (node.nodeValue = text)
  },
  setElementText(node, text) {
    return (node.textContent = text)
  },
  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  },
}
