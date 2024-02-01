const { series, parallel } = require('gulp')

function defaultTask(done) {
  console.log('defaultTask')
  done()
}

exports.default = defaultTask
