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
let s1: string = 'abc'
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
let tuple: [string, number, boolean] = ['jw', 30, true]
let username = tuple[0] // tpye: string
// 元组可以通过数组的方法进行新增 只能新增已经存在的类型 而且就算放进去了也拿不出来
tuple.push('xxx')

// 在真正开发的时候 肯定采用的都是模块化开发
export { }
