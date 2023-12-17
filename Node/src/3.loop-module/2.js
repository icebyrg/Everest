const path = require('path')
const fs = require('fs')

const result = fs.readFileSync(path.resolve(__dirname, 'test.md'), 'utf-8')

const vm = require('vm')
const a = 100
