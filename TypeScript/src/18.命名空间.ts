// 模块 es6 module

// 模块的特点 如果你在当前文件夹下 写了import export 这个时候会产生一个独立的作用域

// 在TS中除了import和export之外还有一个兼容commonjs规范 amd规范

// import a = require('./module/a') // 现在大部分都采用es6语法了

// es6中的模块语法 在ts中都可以使用

// 外部模块
// 内部模块 namespace 命名空间 -> 自执行函数

// 命名空间中声明的变量或者方法、类都需要导出才能使用 虽然命名空间不导出的时候不报错 但是无法运行

// 命名空间可以用于扩展类、函数、枚举

// 用得不多 因为有了外部模块

import { Zoo } from './module/a'

console.log(Zoo.Dog)
