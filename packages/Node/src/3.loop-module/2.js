const path = require('node:path')
const fs = require('node:fs')

const result = fs.readFileSync(path.resolve(__dirname, 'test.md'), 'utf-8')

const vm = require('node:vm')

const a = 100
