exports.a = 100

module.exports = { b: 200 }

let exports = (module.exports = {})
module.exports = { b: 200 }
