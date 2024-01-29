// 交叉类型（交集）会把多个类型变成一个类型 & 按位与 （都要满足才可以）、联合类型（并集）| 按位或

interface Person1 {
  handsome: string
  address: {
    n: string
  }
}
interface Person2 {
  high: string
  address: {
    n: number
  }
}

type Person = Person1 & Person2 // 联合类型是或者的关系
type Temp = Person['address']['n']

// let p: Person = {
//   handsome: '',
//   high: '',
//   address: {
//     n: 'abc', // 我们的交叉类型 交叉出来的结果可以赋予给A 也可以赋予给B
//     // 生成的交叉类型是A B的子类 内部的嵌套类型也会做交叉类型
//   },
// }

function mixin<T, U>(a: T, b: U): T & U {
  return { ...a, ...b }
}
type Compute<T> = { [P in keyof T]: T[P] }

let r = mixin({ a: 1, b: 2 }, { c: 3, b: '2' })
r.b

// 交叉后的结果 涵盖所有的内容
type x = Compute<typeof r>

export {}
