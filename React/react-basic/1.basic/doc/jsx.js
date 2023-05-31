import { JSX } from 'react/jsx-runtime'
JSX('h1', {
  className: 'title',
  style: {
    color: 'red',
  },
  children: 'hello',
})

React.createElement(
  'h1',
  {
    className: 'title',
    style: {
      color: 'red',
    },
  },
  'hello'
)
