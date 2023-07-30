// packages/runtime-dom/src/nodeOps.ts
var nodeOps = {
  insert(el, parent, anchor) {
    return parent.insertBefore(el, anchor || null);
  },
  remove(el) {
    const parent = el.parentNode;
    if (parent) {
      return parent.removeChild(el);
    }
  },
  createElement(type) {
    return document.createElement(type);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setText(node, text) {
    return node.nodeValue = text;
  },
  setElementText(node, text) {
    return node.textContent = text;
  },
  parentNode(node) {
    return node.parentNode;
  },
  nextSibling(node) {
    return node.nextSibling;
  }
};

// packages/runtime-dom/src/props.ts
function patchStyle(el, prevValue, nextValue) {
  const style = el["style"];
  if (nextValue) {
    for (let key in nextValue) {
      style[key] = nextValue[key];
    }
  }
  if (prevValue) {
    for (let key in prevValue) {
      if (nextValue[key] == null) {
        style[key] = null;
      }
    }
  }
}
function patchClass(el, nextValue) {
  if (nextValue == null) {
    el.removeAttribute("class");
  } else {
    el.className = nextValue;
  }
}
function createInvoker(val) {
  const invoker = (e) => invoker.val(e);
  invoker.val = val;
  return invoker;
}
function patchEvent(el, eventName, nextValue) {
  const invokers = el._vei || (el._vei = {});
  const exists = invokers[eventName];
  if (exists && nextValue) {
    exists.val = nextValue;
  } else {
    const name = eventName.slice(2).toLowerCase();
    if (nextValue) {
      const invoker = invokers[eventName] = createInvoker(nextValue);
      el.addEventListener(name, invoker);
    } else if (exists) {
      el.removeEventListener(name, exists);
      invokers[eventName] = null;
    }
  }
}
function patchAttr(el, key, nextValue) {
  if (nextValue == null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}
function patchProp(el, key, prevValue, nextValue) {
  if (key === "style") {
    return patchStyle(el, prevValue, nextValue);
  } else if (key === "class") {
    return patchClass(el, nextValue);
  } else if (/on[^a-z]/.test(key)) {
    return patchEvent(el, key, nextValue);
  } else {
    return patchAttr(el, key, nextValue);
  }
}

// packages/shared/src/index.ts
var isObject = (value) => {
  return value != null && typeof value === "object";
};
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}

// packages/runtime-core/src/createVNode.ts
var Text = Symbol("Text");
var Fragment = Symbol("Fragment");
function isVNode(val) {
  return !!(val && val.__v_isVNode);
}
function convert(child) {
  if (isString(child) || isNumber(child)) {
    return createVNode(Text, null, child);
  } else {
    return child;
  }
}
function normalizeChildren(children) {
  return children.map(convert);
}
function isSameVnode(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
function createVNode(type, props, children = null) {
  const shapeFlag = isString(type) ? 1 /* ELEMENT */ : 0;
  const vnode = {
    shapeFlag,
    __v_isVNode: true,
    type,
    props,
    key: props && props.key,
    el: null,
    // 每个虚拟节点都对应一个真实节点 用来存放真实节点的 后续更新的时候会产生新的虚拟节点 比较差异更新真实 DOM
    children
  };
  if (children) {
    let type2 = 0;
    if (Array.isArray(children)) {
      vnode.children = normalizeChildren(children);
      type2 = 16 /* ARRAY_CHILDREN */;
    } else {
      vnode.children = String(children);
      type2 = 8 /* TEXT_CHILDREN */;
    }
    vnode.shapeFlag |= type2;
  }
  return vnode;
}

// packages/runtime-core/src/renderer.ts
function getSeq(arr) {
  const result = [0];
  const len = arr.length;
  let resultLastIndex;
  let start;
  let end;
  let middle = 0;
  let p = arr.slice(0);
  for (let i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI != 0) {
      resultLastIndex = result[result.length - 1];
      if (arr[resultLastIndex] < arrI) {
        result.push(i2);
        p[i2] = resultLastIndex;
        continue;
      }
      start = 0;
      end = result.length - 1;
      while (start < end) {
        middle = (start + end) / 2 | 0;
        if (arr[result[middle]] < arrI) {
          start = middle + 1;
        } else {
          end = middle;
        }
      }
      if (arrI < arr[result[end]]) {
        p[i2] = result[end - 1];
        result[end] = i2;
      }
    }
  }
  let i = result.length;
  let last = result[i - 1];
  while (i-- > 0) {
    result[i] = last;
    last = p[last];
  }
  return result;
}
function createRenderer(options) {
  let {
    insert: hostInsert,
    remove: hostRemove,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    patchProp: hostPatchProp
  } = options;
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      const child = convert(children[i]);
      patch(null, child, container);
    }
  };
  const unmountChildren = (children) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i]);
    }
  };
  const unmount = (vnode) => {
    hostRemove(vnode.el);
  };
  const mountElement = (vnode, container, anchor) => {
    const { type, props, shapeFlag, children } = vnode;
    let el = vnode.el = hostCreateElement(type);
    if (props) {
      for (let key in props) {
        hostPatchProp(el, key, null, props[key]);
      }
    }
    if (16 /* ARRAY_CHILDREN */ & shapeFlag) {
      mountChildren(children, el);
    } else {
      hostSetElementText(el, children);
    }
    hostInsert(el, container, anchor);
  };
  const patchProps = (oldProps, newProps, el) => {
    for (let key in newProps) {
      hostPatchProp(el, key, oldProps[key], newProps[key]);
    }
    for (let key in oldProps) {
      if (!(key in newProps)) {
        hostPatchProp(el, key, oldProps[key], null);
      }
    }
  };
  const patchChildren = (n1, n2, el) => {
    let c1 = n1.children;
    let c2 = n2.children;
    let prevShapeFlag = n1.shapeFlag;
    let shapeFlag = n2.shapeFlag;
    if (shapeFlag & 8 /* TEXT_CHILDREN */) {
      if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
        unmountChildren(c1);
      }
      if (c1 !== c2) {
        hostSetElementText(el, c2);
      }
    } else {
      if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
        if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
          patchKeyedChildren(c1, c2, el);
        } else {
          unmountChildren(c1);
        }
      } else {
        if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
          hostSetElementText(el, "");
        }
        if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
          mountChildren(c2, el);
        }
      }
    }
  };
  const patchKeyedChildren = (c1, c2, el) => {
    let i = 0;
    let e1 = c1.length - 1;
    let e2 = c2.length - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i];
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2];
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        while (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = c2[nextPos]?.el;
          patch(null, c2[i], el, anchor);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i]);
        i++;
      }
    }
    console.log(i, e1, e2);
    let s1 = i;
    let s2 = i;
    const keyToNewIndexMap = /* @__PURE__ */ new Map();
    for (let i2 = s2; i2 <= e2; i2++) {
      const child = c2[i2];
      keyToNewIndexMap.set(child.key, i2);
    }
    const toBePatch = e2 - s2 + 1;
    const newIndexToOldIndexMap = new Array(toBePatch).fill(0);
    for (let i2 = s1; i2 <= e1; i2++) {
      const child = c1[i2];
      let newIndex = keyToNewIndexMap.get(child.key);
      if (newIndex == void 0) {
        unmount(child);
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
        patch(child, c2[newIndex], el);
      }
    }
    const increasingIndexMap = getSeq(newIndexToOldIndexMap);
    let lastIndex = increasingIndexMap.length - 1;
    for (let i2 = toBePatch - 1; i2 >= 0; i2--) {
      const anchorIndex = s2 + i2;
      const child = c2[anchorIndex];
      const insertAnchor = c2[anchorIndex + 1]?.el;
      if (newIndexToOldIndexMap[i2] === 0) {
        patch(null, child, el, insertAnchor);
      } else {
        if (increasingIndexMap[lastIndex] === i2) {
          lastIndex--;
        } else {
          hostInsert(child.el, el, insertAnchor);
        }
      }
    }
    console.log(keyToNewIndexMap);
  };
  const patchElement = (n1, n2, container) => {
    let el = n2.el = n1.el;
    patchProps(n1.props || {}, n2.props, el);
    patchChildren(n1, n2, el);
  };
  function processElement(n1, n2, container, anchor) {
    if (n1 == null) {
      mountElement(n2, container, anchor);
    } else {
      patchElement(n1, n2, container);
    }
  }
  function processText(n1, n2, container) {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container);
    } else {
      let el = n2.el = n1.el;
      if (n2.children != n1.children) {
        hostSetText(el, n2.children);
      }
    }
  }
  function processFragment(n1, n2, container) {
    if (n1 == null) {
      mountChildren(n2.children, container);
    } else {
      patchChildren(n1, n2, container);
    }
  }
  const patch = (n1, n2, container, anchor = null) => {
    if (n1 && !isSameVnode(n1, n2)) {
      unmount(n1);
      n1 = null;
    }
    const { type } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container);
        break;
      case Fragment:
        processFragment(n1, n2, container);
        break;
      default:
        processElement(n1, n2, container, anchor);
        break;
    }
  };
  return {
    render(vnode, container) {
      if (vnode == null) {
        unmount(container._vnode);
      } else {
        const prevVnode = container._vnode || null;
        const nextVnode = vnode;
        patch(prevVnode, nextVnode, container);
        container._vnode = vnode;
      }
    }
  };
}

// packages/runtime-core/src/h.ts
function h(type, propsOrChildren, children) {
  const len = arguments.length;
  if (len === 2) {
    if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (len > 3) {
      children = Array.from(arguments).slice(2);
    } else {
      if (len === 3 && isVNode(children)) {
        children = [children];
      }
    }
    return createVNode(type, propsOrChildren, children);
  }
}

// packages/runtime-dom/src/index.ts
var renderOptions = {
  ...nodeOps,
  patchProp
};
function render(vdom, container) {
  const { render: render2 } = createRenderer(renderOptions);
  render2(vdom, container);
}
export {
  Fragment,
  Text,
  convert,
  createRenderer,
  createVNode,
  h,
  isSameVnode,
  isVNode,
  normalizeChildren,
  render
};
//# sourceMappingURL=runtime-dom.js.map
