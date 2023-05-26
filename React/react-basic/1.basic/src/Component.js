class Updater {
  // 每个更新器会保存一个类的实例
  constructor(classInstance) {
    this.classInstance = classInstance
    // 用来存放更新的状态
    this.pendingStates = []
  }
  addState(partialState) {
    this.pendingStates.push(partialState)
    // 准备更新
    this.emitUpdate()
  }
  emitUpdate() {
    this.updateComponent()
  }
  updateComponent() {
    // 获取等待生效的状态数组和类的实例
    const { pendingStates, classInstance } = this
    // 如果有等待更新的状态数组
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }
  // 根据等待生效的状态数组和当前的状态，计算出最新的状态
  getState() {
    const { pendingStates, classInstance } = this
    // 先获取类的实例上的老状态
    let { state } = classInstance
    pendingStates.forEach((nextState) => {
      state = { ...state, ...nextState }
    })
    pendingStates.length = 0
    return state
  }
}

function shouldUpdate(classInstance, nextState) {
  // 先把计算得到的最新的状态赋值给类的实例
  classInstance.state = nextState
  // 让组件强制更新
  classInstance.forceUpdate()
}

export class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    // 每个类会有一个更新器的实例
    this.updater = new Updater(this)
  }
  setState(partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate() {
    // forceUpdate
    console.log('forceUpdate', this.state)
  }
}
