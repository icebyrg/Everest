// 学习ts 就是学习TS中的类型

// 常见的类型：基础类型、高级类型 = 自定义类型 ts包中内置了很多类型

// TS中冒号后面的都是类型标识 等号后面是值

// 1) ts 类型是从安全的角度出发的 一切从安全的角度出发
// 2) ts是在开发的时候来检测 不是在运行的时候 所以代码并没有被真正的执行
// 3) ts中是具备一个类型推导的特点 不是所有的变量都需要增加类型 只有无法推断或者推断错误的时候 我们才需要编写类型

// ts最终编译后 类型就消失了（类型就是空气）

// 先给js的原始数据类型能进行标识

let name: string = 'jiang'
let age: number = 30
let male: boolean = true

// 原始数据类型 都要采用小写的类型 大写类型（包装的类型）用来描述的是实例
let str: string = 'abc'
// let s2: string = new String('abc')
// let s3: String = new String('abc')
// let s4: String = 'abc'

// 'abc'.charAt // 默认当我们调用基本类型的方法时 会将当前类型包装成对象类型

// 在ts中 大写类型可以描述实例
// 包装对象

// 数组的类型 []
// 数组的概念：数组是多个相同类型的数据集合 js中数组可以随意存放
// ts中有两种方式可以标注数组类型
let arr1: number[] = [1, 2, 3, 4]
let arr2: string[] = ['a', 'b', 'c', 'd']
let arr3: (string | number)[] = [1, 2, 3, 4, 'a', 'b', 'c', 'd']
let arr4: Array<string> = ['a', 'b', 'c'] // 采用泛型来声明数组

// ts中的元组（特点就是长度固定、类型固定）
let tuple: [string, number, boolean] = ['sam', 30, true]
let username = tuple[0] // tpye: string
// 元组可以通过数组的方法进行新增 只能新增已经存在的类型 而且就算放进去了也拿不出来
tuple.push('xxx')

// 3) ts中的枚举 自带类型的对象 枚举的值如果没有赋值则从0开始递增 反举 只能在我们值为数字的情况
// 状态码、接口的定义、权限、标识位
enum USER_ROLE { // 像代码中的常量 可以全部采用枚举 提示友好 使用方便
  USER = 'a',
  ADMIN = 10,
  SUPER_ADMIN
}
console.log(USER_ROLE.USER);
// console.log(USER_ROLE[0]);

// 常量枚举不能反举（一般用不到反举）不会生成对象 而是直接将值拿出来了

// 4) null undefined 默认情况下null和undefined只能赋予给null和undefined
// 配置项strictNullChecks可以允许两者赋值
const n: null = null
const u: undefined = undefined
// 如果在非严格null检测的情况下 那么undefined和null是任何类型的子类型
// 类似于
let string: string | null | undefined = 'abc'
string = undefined

// 5) void类型 空类型 函数的返回值 可以用void标识 其他情况用不到
// undefined 区别于 void
function fn1() { }
function fn2() {
  return
}
// undefined可以赋予给void
function fn3(): void {
  return undefined
  // return null // null不能赋予给void
}

// never类型 任何类型的子类型 never意味着这个值不可能出现

// 1) 函数无法到达终点
function whileTrue(): never {
  while (true) { }
}

function throwError(): never {
  throw new Error()
}

function fn() {
  throwError()
  let a = 1 // Unreachable code detected.
}

// never可以赋值给其他类型
let temp: string = whileTrue()

// 校验逻辑的完整性可以利用never特性 实现完整性保护
function validateCheck(v: never) { }
function getResult(strOrBooleanOrNum: string | number | boolean) {
  // 在内部写js逻辑的时候 要对每种类型做处理
  // 如果是字符串 'abc' -> [a, b, c]
  // 123 -> [1, 2, 3]
  // true -> [t, r, u, e]
  if (typeof strOrBooleanOrNum === 'string') {
    return strOrBooleanOrNum.split('')
  } else if (typeof strOrBooleanOrNum === 'number') {
    return strOrBooleanOrNum.toString().split('')
  } else if (typeof strOrBooleanOrNum === 'boolean') {
    return strOrBooleanOrNum.toString().split('')
  } else {
    // 如果达不到never 则可以正常运行 需要配置 "strictNullChecks": false
    // let n: never = strOrBooleanOrNum
    validateCheck(strOrBooleanOrNum)
    return []
  }
}

// string number boolean null undefined 枚举 元组 数组 never void object symbol bigint
// Object.create({})

// 大写的Object类型不用（万物皆对象 最终都会找到Object）
// {} 字面量类型 {} = new Object 一般不会这样使用
function create(target: object) { } // new Proxy()
create(function () { })
create([])
create({})
// create(123)

// symbol和bigint基本不使用
const s1: symbol = Symbol()
const s2: symbol = Symbol()
console.log(s1 === s2);

const big: bigint = BigInt(Number.MAX_SAFE_INTEGER + 100) // bigint不能赋予给number
// const n: number = big

// any 不进行类型检测 一旦用户写了any之后 所有校验都消失了 如果一个变量声明的时候没有赋值默认也是any
let arr: any = [] // 能不写any 就不写any
arr = []
arr = 1
arr()
arr.xxx
// 出问题了 自己负责

// 在真正开发的时候 肯定采用的都是模块化开发
export { }
