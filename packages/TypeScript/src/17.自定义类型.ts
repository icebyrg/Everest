// 自定义类型
type Compute<T extends object> = {
  [K in keyof T]: T[K] // 映射
}

// Exclude Extract 集合的操作
// Pick Omit 对对象结构的操作
// Partial Required Readonly 起修饰作用
// ReturnType Paramaters InstanceType ... （基于infer）

// Pick Omit 对对象结构的操作

// 让部分属性变为可选属性 怎么办
interface Company {
  num: number
  name: string
}
interface Person<T = any> {
  name: string
  age: number
  company: T
  address: string
}

// 先将name属性挑出来变为可选的 & 除了name属性
type PartialPropsOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type x1 = Compute<PartialPropsOptional<Person, 'name'>>

// 以前是根据key来选属性
// 根据值的类型来选择key
type PickKeysByValue<T extends object, U> = {
  // as 语法映射成一个新的变量
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}
type x2 = PickKeysByValue<Person, string>

/* 
type isEqual<T, U, Success, Fail> = [T] extends [U] ? ([U] extends [T] ? Success : Fail) : Fail

// {name:'name',age:never,address:'address'}
type ExtractKeysByValueType<T, U, O = false> = {
  [K in keyof T]: isEqual<T[K], U, isEqual<O, true, never, K>, isEqual<O, true, K, never>>
}[keyof T] // 找到需要的属性 再通过属性选出来就可以了 name|address

type PickKeysByValue<T, U> = Pick<T, ExtractKeysByValueType<T, U>>
type x2 = PickKeysByValue<Person, string>

// 如果是Omit该如何编写？
type OmitKeysByValue<T, U> = Pick<T, ExtractKeysByValueType<T, U, true>>
type x3 = OmitKeysByValue<Person, string>
*/

// 求对象的交集 Pick Omit Exclude Extract

// 求交集（name:string, address:number）
type ObjectInter<T extends object, U extends object> = Pick<U, Extract<keyof T, keyof U>> // name,address

type X1 = ObjectInter<A, B>

// 求对象的差集 B - A : Omit+Extract == Pick+Exclude
type ObjectDiff<T extends object, U extends object> = Omit<U, Extract<keyof T, keyof U>>
type X2 = ObjectDiff<A, B>

type ObjectComp<T extends object, U extends T> = Omit<U, Extract<keyof T, keyof U>>
// type X3 = ObjectComp<B, A> // 求补集

// 重写A类型
type A = {
  name: string
  age: number
  address: string
}

type B = {
  name: string
  address: number
  male: boolean
}

export {}
