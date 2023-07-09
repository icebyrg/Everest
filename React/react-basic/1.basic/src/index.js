import React from './react'
import ReactDOM from './react-dom/client'

class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: 0, age: 16 }
  }
  handleClick = () => {
    // open batch update before going into event callback
    this.setState({
      number: this.state.number + 1,
    })
    console.log(this.state.number)
    this.setState({
      number: this.state.number + 1,
    })
    console.log(this.state.number)
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1,
      })
      console.log(this.state.number)
      this.setState({
        number: this.state.number + 1,
      })
      console.log(this.state.number)
    }, 1000)
    // after function finished close batch update
  }
  clickButton = (event) => {
    console.log('clickButton')
  }
  clickDiv = (event) => {
    console.log('clickDiv')
  }
  render() {
    return (
      <div id="counter" onClick={this.clickDiv}>
        <p id="myp">number: {this.state.number}</p>
        <button onClick={this.clickButton}>+</button>
      </div>
    )
  }
}

const DOMRoot = ReactDOM.createRoot(document.getElementById('root'))
let element = <ClassComponent title="world" />
DOMRoot.render(element)
