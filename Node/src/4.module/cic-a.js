let moduleB
module.exports = {
  saveModule(module) {
    moduleB = module
  },
  fn() {
    moduleB.use() // use b in a
  },
  use() {
    console.log('use a')
  },
}
