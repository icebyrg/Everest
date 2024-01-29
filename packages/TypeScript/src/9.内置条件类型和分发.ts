// 条件类型 extends 约束 经常和条件类型一起使用
// 条件类型的格式 可以看成是三元表达式

type ResStatusMessage<T> = T extends 200 | 201 | 204 | 206 ? 'success' : 'fail'

// 字面量类型 好像是最小的

type IMessage = ResStatusMessage<300>
// 对于联合类型而言 子类型是其中的任何一个
// 交叉后的结果 就是 交叉前的某个类型的子类型 Exclude Extract

type Conditional<T, U> = T extends U ? true : false

type R1 = Conditional<'testString', string>
type R2 = Conditional<'testString', number> // 泛型在条件类型中广泛被应用

// 如果是字符串 返回字符串 如果是number 返回number 两者都不是返回never
type FormatReturnValue<T> = T extends string ? string : T extends number ? number : never
function sum<T extends string | number>(a: T, b: T): FormatReturnValue<T> {
  return a + (b as any) // 泛型之间不能做运算
}
let r = sum(1, 2) // string & number

// interface Fish {
//   name: '鱼'
// }
// interface Water {
//   type: '水'
// }
// interface Bird {
//   name: '鸟'
// }
// interface Sky {
//   type: '太空'
// }

// type SelectType<T> = T extends Fish ? Water : Sky
// type R3 = SelectType<Bird | Fish> // 先留在这

// extends 父子关系（类型等级）

type T1 = never extends '123' ? true : false // 子类型可以赋予给父类型

// never和字面量的关系
// 字面量类型 和 基础类型的关系
// 基础类型 和 包装类型
// any

// 1) never 和 字面量的关系
let a: number = (function (): never {
  // 底端类型 最底层的
  throw new Error()
})()

// 2) 字面量类型肯定是基础类型的子类型
type T2 = 123 extends number ? true : false
type T3 = 'abc' extends string ? true : false

// 3) 基础类型是包装类型的子类型
// 所有包装类型的上一层都是Object {} 字面量类型 == new Object
type T4 = string extends String ? true : false
type T5 = String extends {} ? true : false
let temp: string = '123'
let s: String = temp

// 4) 所有类型都是any和unknown的子类型
// type T6 = any extends unknown ? true : false
// any = unkown 顶端类型

type T6 = undefined extends void ? true : false // any 可以看成1 + 其他类型（内置有分发的机制）直接取最终的联合类型

// 另一个情况 多类型的比较（分发）

interface Fish {
  name: '鱼'
}
interface Water {
  type: '水'
}
interface Bird {
  name: '鸟'
}
interface Sky {
  type: '太空'
}

type SelectType<T> = [T] extends Fish ? Water : Sky
// Bird -> Fish -> Sky
// Fish -> Fish -> Water
// Sky | Water

type T7 = SelectType<Bird | Fish>
// type T8 = Bird | Fish extends Fish ? Water : Sky // 先留在这

/* 
  分发机制：
  1) 通过泛型传入的方式来比较的时候会出现分发
  2) 类型需要是联合类型
  3) 类型需要完全的裸露出来（裸类型）
*/

// 知道了分发机制的产生原因 在开发中就要避免

// 判断谁是谁的子类型时 就会发生异常 <1|2, 1|2|3> <1|2|3, 1|2>

type NoDistribute<T> = T & {}
type UnionAssets<T, U> = NoDistribute<T> extends U ? true : false

type T8 = UnionAssets<1 | 2, 1 | 2 | 3>
type T9 = UnionAssets<1 | 2 | 3, 1 | 2> // true | true | false -> boolean

// 如何判断两个类型完全相等：
type IsEqual<T, U, Success, Fail> = NoDistribute<T> extends U ? (NoDistribute<U> extends T ? Success : Fail) : Fail

type T10 = IsEqual<1 | 2, 2 | 1, true, false>

// never 做比较的时候 也会有分发问题
// - any 默认分发
// - never 默认只有通过泛型传递的时候会返回never 不分发就正常
type isNever<T> = NoDistribute<T> extends never ? true : false

type T11 = isNever<never>

// 父子类型关系 如何判断两个类型的父子关系 extends 用法（分发带来的问题）

// 内置的条件类型 Extract Exclude NonNullable 集合操作

// 获取两个联合类型的交集
type Extract<T, U> = T extends U ? T : never // string | number | never
type ExtractResult = Extract<string | number | boolean, string | number>

type Exclude<T, U> = T extends U ? never : T // never | never | boolean
type ExcludeResult = Exclude<string | number | boolean, string | number>

// 补集? 含义就是互补的 差集+子类的关系
type Complement<T, U extends T> = T extends U ? never : T
type ComplementResult = Complement<string | number | boolean, string>

let ele = document.getElementById('root')

type NonNullable<T> = T extends null | undefined ? never : T
type Element = NonNullable<typeof ele>

// infer 类型推断
export {}
