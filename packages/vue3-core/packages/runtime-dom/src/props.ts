function patchStyle(el, prevValue, nextValue) {
  // prev: {color:red}  next: {background:red}
  const style = el['style']
  if (nextValue) {
    // 用新的样式生效 所有的style
    for (let key in nextValue) {
      style[key] = nextValue[key]
    }
  }
  if (prevValue) {
    for (let key in prevValue) {
      if (nextValue[key] == null) {
        style[key] = null
      }
    }
  }
}
function patchClass(el, nextValue) {
  if (nextValue == null) {
    el.removeAttribute('class')
  } else {
    el.className = nextValue
  }
}

// function的神奇用法
function createInvoker(val) {
  const invoker = (e) => invoker.val(e)
  invoker.val = val
  return invoker
}

// abc -> bcd
function patchEvent(el, eventName, nextValue) {
  // 对于事件 我们并不关心之前是什么 而是用最新的结果
  const invokers = el._vei || (el._vei = {})
  const exists = invokers[eventName]
  // click: customEvent -> e
  // 通过一个自定义的变量 绑定这个变量 后续更改变量对应的值
  if (exists && nextValue) {
    exists.val = nextValue // 换绑事件
  } else {
    const name = eventName.slice(2).toLowerCase()
    if (nextValue) {
      const invoker = (invokers[eventName] = createInvoker(nextValue))
      el.addEventListener(name, invoker)
    } else if (exists) {
      el.removeEventListener(name, exists)
      invokers[eventName] = null
    }
  }
}

function patchAttr(el, key, nextValue) {
  if (nextValue == null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, nextValue)
  }
}

// 事件
export function patchProp(el, key, prevValue, nextValue) {
  // 属性的初始化和更新：对于初始化 prevValue: null
  // {style:{color:red}} -> el.style[key] = value
  if (key === 'style') {
    return patchStyle(el, prevValue, nextValue)
  } else if (key === 'class') {
    return patchClass(el, nextValue)
    // {class:"abc"}->el.className(class,'')
  } else if (/on[^a-z]/.test(key)) {
    return patchEvent(el, key, nextValue)
    // onClick -> addEventListener()
  } else {
    return patchAttr(el, key, nextValue)
  }
}
