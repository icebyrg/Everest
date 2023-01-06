export {}

// 类型推断

// 1) 赋值推断
let name = 'ajingwen'
let age = 13
let male = true

// 类型推断是从右边向左边

// function sum(a: string, b: string) {
//   // 函数的返回值可以自动推断
//   return a + b
// }

// 3) 反向推断 从左向右 上下文类型
type ISum = (x: string, y: string) => string

const sum: ISum = (a, b) => {
  // a->string b->string
  return a + b // ->string
}

type ICallback = (x: string, y: string) => void // 不关心返回值

function fn(cb: ICallback) {
  let r = cb('1', '2') // 调用函数后不会根据返回值来推导 默认采用就是上下文声明中的类型
}

// 函数的参数 推断是按照上下文类型的位置来推断的
fn((a, b) => {
  return 'abc'
})

// void为什么设计成这个样子？干脆直接要求必须void不就好了么
let total = 0
// 标记成void 意味着用户可以写返回值 但是实际上用不到
;[1, 2, 3].forEach((item) => (total += item))
