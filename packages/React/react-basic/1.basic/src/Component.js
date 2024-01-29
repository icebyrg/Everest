import { compareTwoVdom, findDOM } from './react-dom/client'

// an update queue
export const updateQueue = {
  isBatchingUpdate: false, // flag for whether updated, default in no batch and sync
  updaters: new Set(), // update set
  batchUpdate() {
    updateQueue.isBatchingUpdate = false
    for (const updater of updateQueue.updaters)
      updater.updateComponent()

    updateQueue.updaters.clear()
  },
}
class Updater {
  // each updater will save an instance of component class
  constructor(classInstance) {
    this.classInstance = classInstance
    // save state of update
    this.pendingState = []
    this.callbacks = []
  }

  flushCallbacks() {
    if (this.callbacks.length > 0) {
      this.callbacks.forEach(callback => callback())
      this.callbacks.length = 0
    }
  }

  addState(partialState, callback) {
    this.pendingState.push(partialState)
    if (typeof callback === 'function')
      // ready to update
      this.emitUpdate()
  }

  emitUpdate() {
    // if need batch update
    if (updateQueue.isBatchingUpdate) {
      // no direct update component, save updater to queue
      updateQueue.updaters.add(this)
    }
    else {
      this.updateComponent()
    }
    this.updateComponent()
  }

  updateComponent() {
    // get pending state array and class instance
    const { pendingState, classInstance } = this
    // if has state waiting for update
    if (pendingState.length > 0)
      shouldUpdate(classInstance, this.getState())
  }

  // calculate new state based on pending state array
  getState() {
    const { pendingState, classInstance } = this
    let { state } = classInstance
    pendingState.forEach((partialState) => {
      if (typeof partialState === 'function')
        partialState = partialState()

      state = { ...state, ...partialState }
    })
    pendingState.length = 0
  }
}

function shouldUpdate(classInstance, nextState) {
  // assign calculated new value to class instance
  classInstance.state = nextState
  // force component to update
  classInstance.forceUpdate()
}

export class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    // each class has an updater
    this.updater = new Updater(this)
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback)
  }

  forceUpdate() {
    // get old dom then calc new virtual dom, diff them then update to real dom
    // get old virtual dom first: div#counter
    const oldRenderVdom = this.oldRenderVdom
    // cal new virtual dom based on new state
    const newRenderVdom = this.render()
    // get old real dom(div)
    const oldDOM = findDOM(oldRenderVdom)
    // dom diff
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom)
    // update oldRenderVdom to newly newRenderVom after updated
    // always pointed to the current child node of current parent node
    this.oldRenderVdom = newRenderVdom
    this.updater.flushCallbacks()
  }
}
