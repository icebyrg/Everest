// 函数中的类型 对于函数来说我们主要关心的是 函数的入参类型和函数的返回值类型
// function sum(a: string, b: string): string {
//   return a + b
// }
// sum()

// 函数的声明方式有两种 function关键字来声明 表达式来声明
// type Sum = (x: string, y: string) => string
// let sum: Sum = function (a: string, b: string): string {
//   return a + b
// }
// let sum2: { (x: string, y: string): string } = function (a: string, b: string): string {
//   return a + b
// }

// 对于表达式声明而言 可以给变量重新赋值
// 表达式我们如果给变量写好了一个类型 就意味着我们赋予的值要满足这个类型

// 函数的所有特性 都支持 可选参数 默认参数 剩余运算符都可以
// ? 表示参数可选 TS的类型
// = 就是默认值的意思 js的默认值
type Sum = (x: string, y?: string) => string
// let sum: Sum = function (a, b = '123'): string { // 可选和默认值都要放在最后面
//   return a + b
// }

let sum = function (a?: string, ...args: string[]): string {
  // 剩余参数
  // 不需要arguments
  return args.reduce((memo, current) => memo + current, a)
}

let r = sum('a', 'b', 'c', 'd')

// TS中的关键字 typeof 取变量的类型 返回的是类型 keyof 取的是类型的key的集合
function getName(this: Person, key: PersonKey) { // this必须放第一个参数
  return this[key]
}
const person = { name: 'jw' }

type Person = typeof person
type PersonKey = keyof Person
getName.call(person, 'name')

export { }
