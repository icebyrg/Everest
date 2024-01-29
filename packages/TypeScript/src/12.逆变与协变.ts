// 逆变 子->父 协变 父->子 （传父、传子）
class Parent {
  house() {}
}
class Child extends Parent {
  car() {}
}
class Grandson extends Child {
  sleep() {}
}

// 都是可以通过父子关系来证明兼容性的
function fn(callback: (instance: Child) => Child) {
  // callback(new Child())
  let r = callback(new Grandson())
  // r是child的类型 如果用户返回了new Grandson grandson是属于child的子类型
  // 返回值可以传递子类
}

// 1) 赋予值的时候可以赋予 自己和子类型
// 2）内部调用callback的时候 可以传递child或者Grandson（传递了grandson 但是在使用grandson中的属性肯定使用不了）
// 3) 如果用户回调中 使用属性的时候 要保证范围不能超过 Child控制的范围 所以标识grandson的话可能会不安全 但是标识parent是安全的 因为子类中的属性包含了parent

// 一个值随着输入的变化而变化 协变，相反就是逆变

type Arg<T> = (arg: T) => void
type Return<T> = (arg: any) => T

type isArg = Arg<Parent> extends Arg<Child> ? true : false // 逆变
type isReturn = Return<Grandson> extends Return<Child> ? true : false // 协变

fn((instance: Parent): Grandson => {
  return new Grandson()
})

// 逆变带来的问题
interface Array<T> {
  // concat: (...args: T[]) => T[] // 强制触发逆变问题
  concat(...args: T[]): T[] // 这种写法会禁用逆变的效果 不去检测逆变问题
  [key: number]: any
}
let parentArr!: Array<Parent>
let childArr!: Array<Parent>

// parent[] <- chlid[]
parentArr = childArr // 儿子应该可以赋予父亲

export {}
