import React from 'react'
import { removePrivateProps } from 'zhang-utils'

const element = React.createElement(
  'div',
  {
    style: {
      color: 'red',
    },
    className: 'container',
  },
  'hello',
  React.createElement(
    'span', // DOM的类型
    {
      style: {
        color: 'blue', // 行内属性
      },
    },
    'world', // 儿子
  ),
)
console.log(JSON.stringify(removePrivateProps(element, ['key', 'ref']), null, 2))
