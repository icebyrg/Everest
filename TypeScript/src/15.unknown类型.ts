// unknown 和 any 都是顶级类型 unknown是any的安全类型
// any是随意 不进行类型检测了
// unknown 还是要检测的 相对于any来说 在没有确定类型之前是不能操作的 不能当做函数、类、对象
let c: unknown = 1

function isFunction(val: unknown): val is () => void {
  return typeof val === 'function'
}
function isString(val: unknown): val is string {
  return typeof val === 'string'
}

if (isFunction(c)) {
  c()
} else if (isString(c)) {
  c.toLowerCase()
}

// unknown的特点
type unionUnknown = unknown | null | undefined | string // unknown true|false=>boolean
type interUnknown = unknown & string // 经常我们写一些泛型 要求泛型的类型是字符串 K extends Keyof T (K & string) (T & {})

type isNever = keyof unknown // 索引查询

type Compute<T> = {
  [X in keyof T]: T[X]
}
type X = Compute<unknown>

let r: unknown = JSON.parse('{a:1}')

export {}
