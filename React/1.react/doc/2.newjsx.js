// 在React17以前，babel转换是老的写法
const babel = require('@babel/core')
let sourceCode = `<h1>
hello<span style={{ color: 'red' }}>world</span>
</h1>`

const result = babel.transform(sourceCode, {
  plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
})

console.log(result.code)

import { jsx as _jsx } from 'react/jsx-runtime'
import { jsxs as _jsxs } from 'react/jsx-runtime'
_jsxs('h1', {
  children: [
    'hello',
    _jsx('span', {
      style: {
        color: 'red',
      },
      children: 'world',
    }),
  ],
})

// React.createElement=>_jsx
