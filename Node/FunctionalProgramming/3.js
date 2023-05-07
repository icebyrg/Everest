const _ = require('lodash')
const str = 'click button'
let pp1 = _.split(str, ' ')
let pp2 = _.join(pp1, '_')
let pp3 = _.toUpper(pp2)

// 组合的要求 必须是一个参数的入参 柯里化
// 函数式编程 是组合后 传递数据 拿到结果 str
const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, arr) => _.join(arr, sep))

const composed = _.flowRight(_.toUpper, join('_'), split(' '))
console.log(composed(str), 'curry + composed')

const lodash = require('lodash/fp') // lodash/fp 模块中的函数都是柯里化的 都给你处理成参数先行的特点

const composed2 = lodash.flowRight(_.toUpper, lodash.join('_'), lodash.split(' '))
console.log(composed2(str), 'lodash/fp')

// 小结：函数式编程的核心就是组合，组合的前提是函数必须是纯函数，纯函数的特点是输入确定，输出确定，没有副作用 可以将一些复杂的运算逻辑抽象成函数 可以复用
