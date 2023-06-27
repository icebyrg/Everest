import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import path from 'path'
import { fileURLToPath } from 'url'

export default {
  input: './src/index3.ts',
  output: {
    file: path.resolve('./dist/bundle.js'), // 打包出来的文件名
    format: 'iife', // 打包出来的结果是一个立即执行函数
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'], // 解析文件的扩展名
    }),
    ts({
      // tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
      // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      tsconfig: 'tsconfig.json',
    }),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3333,
    }),
  ],
}
