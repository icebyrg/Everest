const a = require('./cic-a')
const b = require('./cic-b')

a.saveModule(b)
b.saveModule(a)

// use b`s function in a
a.fn() // used b
b.fn() // used a

// seajs

// module as its own way of loading
// native module & third party module (both path has no ./ or ../)
// loadNativeModule paths
// 1. if imported module is a native module will direct return
// 2. third party module will look up from current path recursively

require('a')
