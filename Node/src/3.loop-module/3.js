const path = require('node:path')
const fs = require('node:fs')
const vm = require('node:vm')

function Module(id) {
  this.id = id
  this.exports = {}
}

Module._extensions = {
  '.js': function (module) {
    const content = fs.readFileSync(module.id, 'utf-8')
    const fn = vm.compileFunction(content, ['exports', 'require', 'module', '__filename', '__dirname'])
    // this -> module.exports
    const exports = module.exports
    const thisValue = exports
    const require = req
    const filename = module.id
    const dirname = path.dirname(filename)
    // 让函数执行 module.exports = 'hello'
    Reflect.apply(fn, thisValue, [exports, require, module, filename, dirname])
  },
  '.json': function (module) {
    const content = fs.readFileSync(module.id, 'utf-8')
    module.exports = JSON.parse(content)
  },
}

Module._resolveFilename = function (id) {
  const filename = path.resolve(__dirname, id)
  if (fs.existsSync(filename))
    return filename

  const keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    // 尝试添加后缀
    const ext = keys[i]
    const filename = path.resolve(__dirname, id + ext)
    if (fs.existsSync(filename))
      return filename
  }
  throw new Error('cannot found module')
}

Module.prototype.load = function () {
  const ext = path.extname(this.id)
  Module._extensions[ext](this)
}

Module._cache = {}
function req(id) {
  const filename = Module._resolveFilename(id)
  const existsModule = Module._cache[filename]
  if (existsModule)
    return existsModule.exports

  const module = new Module(filename) // 这个对象里最重要的就是exports对象
  Module._cache[filename] = module // 加载过缓存起来
  module.load()
  return module.exports // 导出这个对象
}

const a = req('./a.json') // require拿到的是module.exports的结果 如果是引用对象 里面的内容变化了重新require是拿到最新的值

console.log(a)

// this & module.exports is same value can be called mutually
// let exports = (module.exports = {})
// ✅ exports.a = 100
// ❎ exports = { a: 1 } 用户不能直接改变exports的引用 因为不会导致module.exports的变化
// return module.exports
// commonjs 中如果有默认导出 属性导出就无效了

// 导出的方式 this.xxx exports.xxx module.exports.xxx module.exports
