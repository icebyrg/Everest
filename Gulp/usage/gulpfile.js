const { series, parallel } = require('gulp')

const defaultTask = (done) => {
  console.log('defaultTask')
  done()
}

exports.default = defaultTask
