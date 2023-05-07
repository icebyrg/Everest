const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', function (err, name) {
  if (err) {
    return console.log(err)
  }
  fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8', function (err, age) {
    if (err) {
      return console.log(err)
    }
  })
})
