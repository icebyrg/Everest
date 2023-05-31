import React from './react'
import ReactDOM from './react-dom/client'

function FunctionComponent(props) {
  return (
    <div className="title" style={{ color: 'red' }}>
      {props.name}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
let element = <FunctionComponent name="hello" />
root.render(element)
