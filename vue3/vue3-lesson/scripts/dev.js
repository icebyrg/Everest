const { build } = require('esbuild')
const { resolve } = require('path')

const target = 'reactivity'

build({
  // 打包的入口
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
  bundle: true, // 将依赖的模块全部打包
  sourcemap: true, // 支持调试
  format: 'esm', // 打包出来的模块是esm「es6模块」
  platform: 'browser', // 打包的结果给浏览器使用
  watch: {
    onRebuild() {
      console.log('rebuild~~~')
    },
  },
}).then(() => {
  console.log('watching~~~')
})