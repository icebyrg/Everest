function hasVliadKey(config) {
  return config.key !== undefined
}
function hasVliadRef(config) {
  return config.ref !== undefined
}

export function jsxDev(type, config) {
  let propName // 属性名
  const props = {} // 属性对象
  let key = null // 每个虚拟DOM都有一个可选的key属性，用来区分一个父节点下的不同子节点
  let ref = null // 引入，后面可以通过这个实现获取真实DOM的需求
  if (hasVliadKey(config)) {
    key = config.key
  }
  if (hasVliadRef(config)) {
    ref = config.ref
  }
}
