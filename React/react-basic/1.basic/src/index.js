import React from 'react'
import ReactDOM from 'react-dom/client'

let element = (
  <div className="title" style={{ color: 'red' }}>
    <span>hello</span>
  </div>
)
console.log(element)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(element)
