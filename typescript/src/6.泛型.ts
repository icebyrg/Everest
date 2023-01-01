// 泛型可以用于 函数 对象 类
// 根据长度和内容创建一个数组

// 重载 根据参数不同处理结果不同
// val: (string) => string
// val: (number) => number
// val: (boolean) => boolean

// 入参和返回值有映射关系
const getArray = <T>(times: number, val: T): T[] => {
  let result = []
  for (let i = 0; i < times; i++) {
    result.push(val)
  }
  return result
}

getArray(3, 'abc') // ['abc','abc','abc'] 当我使用的时候可以确定类型

// 多个泛型来使用 元组交换
// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]]
// }

// type ISwap = <T, U>(tuple: [T, U]) => [U, T]
// interface ISwap {
//   <T, U>(tuple: [T, U]): [U, T]
// }
// const swap: ISwap = (tuple) => {
//   return [tuple[1], tuple[0]]
// }
// let swapResult = swap(['jw', true])
// let r1 = swapResult[0]

// 1) 使用接口的时候确定的类型
type ICallback<T> = (item: T, idx: number) => void
type IForEach = <T>(arr: T[], callback: ICallback<T>) => void
// 2) 在调用函数的时候确定的类型
// type ICallback1 = <T>(item: T, idx: number) => void
const forEach: IForEach = <T>(arr: T[], callback: ICallback<T>) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i) // callback没有执行 所以无法推导arr[i] = T
  }
}

forEach(['a', 'b', 'c'], function (item) {
  console.log(item)
})
