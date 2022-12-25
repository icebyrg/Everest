const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'test.js',
  },
}
