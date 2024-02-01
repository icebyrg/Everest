// 先转换成函数的联合类型 再基于函数的分发实现对参数的交叉类型
type FindUnionOne<T> = (T extends any ? (a: (p: T) => any) => any : never) extends (a: infer R1) => any ? (R1 extends (a: infer R2) => any ? R2 : never) : never

// 取出最后一项放到元组中 之后在联合类型中排除掉当前这一项 递归取下一次的最后一项
export type UnionToTuple<T, L = FindUnionOne<T>> = [T] extends [never] ? [] : [...UnionToTuple<Exclude<T, L>>, L]

type X1 = FindUnionOne<1 | 2 | 3>

type X = ((p: string) => {
  a: string
}) &
  ((p: number) => {
    b: string
  }) &
  ((p: boolean) => {
    c: string
  })

type Parameters<T> = T extends (p: any) => infer R ? R : never // 一般会返回重载的最后一个结果

type x = Parameters<X>

// let x: X = (p: string | number | boolean): { a: string; b: string; c: string } => {
//   return { a: '1', b: '2', c: '3' }
// }

// function fn(p: string): { a: string }
// function fn(p: number): { b: string }
// function fn(p: boolean): { c: string }
// function fn(p: string | number | boolean): { a: string; b: string; c: string } {
//   return { a: '1', b: '2', c: '3' }
// }
