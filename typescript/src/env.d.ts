declare let age: number
declare function sum(a: string, b: string): string
declare class Person {}
declare const enum Seasons {
  Spring,
  Summer,
}
declare interface Person {
  a: string
}
declare type xxx = 'abc'

interface JQuery {
  // 重载
  height(num?: number): this
  width(num: number): this
  extend(obj: object): this
}

declare const $: {
  (selector: string): JQuery
  ajax(url: string, options: Record<string, any>): void
  fn: JQuery
}

// 自己在业务中解决 代码中使用的变量不存在的问题
declare module 'mitt' {
  import { Zoo } from './module/a'
  type Type = string | symbol
  type Listener = (...args: unknown[]) => void
  const on: (type: Type, listener: Listener) => void
  const emit: (type: Type, ...args: unknown[]) => void
  const off: (type: Type, listener: Listener) => Listener
  export default Zoo
}
