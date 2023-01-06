// 兼容性：子类型可以赋予给父类型 结构上看是否兼容
// ts中 结构化的类型系统（鸭子类型检测）长的一样就ok 比如两个类型名字不一样但是无法区分

let obj: {
  toString(): string
}

let str: string = 'abc'

// 这两个类型单从类型层级来看 是不存在父子关系的

obj = str // 兼容性 我们可以把string看成一个对象 基于toString扩展了其他的功能

obj.toString() // 安全 保证使用的时候不会发生异常
// obj.split() // 不安全

type xxx = keyof string

// 接口类型
interface IAnimal {
  name: string
  age: number
}
interface IPerson {
  name: string
  age: number
  address: string
}
let animal: IAnimal
let person: IPerson = {
  name: 'jw',
  age: 8,
  address: '',
}
animal = person // 子类赋予给父类 兼容（你要的我都有 安全）

// 父子关系不要考虑 谁多谁少 考虑的是父子类型的层级关系

// 函数的兼容性
let sum1 = (a: string, b: string) => a + b
let sum2 = (a: string) => a

const forEach = (arr: any[], callback: (item: any, idx: number, array: any[]) => void) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr)
  }
}

forEach(['a', 'b', 'c'], function (item) {
  console.log(item)
})

// 对于函数的参数来讲 少的参数可以赋予给多的 因为人家内部实现 传递了多个但是我用的少 是安全的 但是如果我多写了那就不安全了

let sum3!: () => string | number
let sum4!: () => string
sum3 = sum4

class A {
  private name!: string
  age!: number
}

class B {
  private name!: string
  age!: number
}

// let a: A = new B()

// 类型分为两种：结构化类型、标称类型
class AddType<S> {
  private _type!: S
}

type NewType<T, S extends string> = T & AddType<S>

type BTC = NewType<number, 'btc'> // number + BTC
type USDT = NewType<number, 'usdt'> // number + USDT

let btc: BTC = 100 as BTC
let usdt: USDT = 100 as USDT

function getCount(count: BTC) {
  return count
}

getCount(btc) // 标称类型

export {}
