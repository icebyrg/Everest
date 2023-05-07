// 类型声明
// 我们编写的类型 在最终编译的时候都会被删除 为了让别人拥有代码提示 用TS写的代码打包后可以生成声明文件
// 我下载了一个早期的非TS的包 在我的项目中用就报错了
// 我们通过CDN引入的包
// 引入了一个不是TS的文件 .vue .md .png .css
// 我想去在全局上扩展的属性使用

// 自己编写声明文件
// 声明类型声明的方式 declare 这都是类型 相当于告诉vscode别报错了

// 这些声明文件不要写在业务代码里 统一管理 .d.ts

let person: Person = {
  a: 'abc',
}
let x: xxx = 'abc'
console.log(sum)

$('.box').height(100).width(100)

$.ajax('/login', { method: 'get' })

$.fn.extend({})

import mitt from 'mitt'
import type { Listener } from 'mitt'

let fn = (...args: any[]) => {
  console.log(args)
}

mitt.on('data', fn)
mitt.emit('data', 'a', 'b')

mitt.off('data', fn)
