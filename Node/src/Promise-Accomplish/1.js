const fs = require('node:fs')
const path = require('node:path')

fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', (err, name) => {
  if (err)
    return console.log(err)

  fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8', (err, age) => {
    if (err)
      return console.log(err)
  })
})
