// the characteristic of module.exports is that it can export objects we can use the trait of reference type to solve this problem
let moduleA
module.exports = {
  saveModule(module) {
    moduleA = module
  },
  use() {
    console.log('use b')
  },

  fn() {
    moduleA.use() // use b in a
  },
}
