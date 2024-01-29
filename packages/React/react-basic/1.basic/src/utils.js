import { REACT_TEXT } from './constant'

/**
 * 为了后续处理方便 把元素做了一下封装 其实主要就是给字符串和数字进行了处理 变成了对象
 * @param {*} element
 * @returns
 */
export function wrapToVdom(element) {
  return typeof element === 'string' || typeof element === 'number' ? { type: REACT_TEXT, props: { content: element } } : element
}
