// 声明一个变量 没有给类型的时候 默认类型是any
let name = 'sam' // 等号左边的类型 可以通过右边自动推导 此时就不用添加类型了

// const let 区别 const意味着值不能发生变化 类型范围更小 let可以改变值 会推断的范围更大

// 联合类型：联合类型在没有确定值之前 只能采用联合类型中的方法；只有确定特定类型后 才能使用对应的方法
let strOrNum: string | number
// ! 非空断言 我断定这个变量一定有值 出错了自己负责
strOrNum!.toString()
strOrNum = 'abc'
strOrNum.toLowerCase()

strOrNum = 13
strOrNum.toFixed()

function fn(strOrNum: string | number) {
  strOrNum.toString()
}

// 联合类型是并集还是交集？并集意味着全部的意思 交集意味着两者共有的东西 联合类型是并集

// 非空断言
let ele = document.getElementById('root')

// ?. 是js语法 叫链判断运算符 这个值没有就不取值了
// ! 意味着这个值存在 是ts语法
// ele?.style.background = 'red'
ele!.style.background = 'red' // ! 意味着认定这个元素一定有值
ele!.style.background // 如果ele不存在依旧要往后取属性

// ?? || && 都是js语法
let r = 0 ?? 'a' // 0 也是false 但是可以返回 这是js语法
console.log(r);

// 我们需要将某个类型直接作为某个类型来使用 类型断言
let strOrNum1: string | number
(strOrNum1! as string).toLocaleLowerCase()
// (<number>strOrNum1!).toFixed(2) // 下面这种不推荐使用

// 断言只能断言成一个已经存在的类型 如果不存在则不能直接断言
// strOrNum1 as string

strOrNum1! as any as boolean // 缺点就是会破坏原有的类型 不建议使用

// 断言：我可以自己指定特定的类型

// 字面量类型
const username: 'sam' = 'sam'
const password: 123456 = 123456

// 字面量类型和联合类型 放在一起用 就更加灵活了
// type关键字和enum关键字都是ts提供的 和js没关系
type Direction = 'up' | 'down' | 'left' | 'right'
let direction: Direction = 'right' // 字面量类型就是限定了值 和枚举类似

export { }
