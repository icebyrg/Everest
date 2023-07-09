import { updateQueue } from './Component'
/**
 * add event handler function to dom element
 * @param {} dom the dom element to add event
 * @param {*} eventType type of event (onClick onClickCapture)
 * @param {*} handler event handler function
 */
export function addEvent(dom, eventType, handler) {
  // determine whether dom element has store attribute, return if it has and empty object if not
  let store = dom.store || (dom.store = {})
  // save attribute (event type like onclick) and value (event handler fn)
  // onClick onClickCapture
  store[eventType.toLowerCase()] = handler
  const eventName = eventType.slice(2).toLowerCase()
  if (!document[eventName]) {
    // distinguish capture and bubble
    document.addEventListener(
      eventName.slice(2).toLowerCase(),
      (event) => {
        dispatchEvent(event, true)
      },
      true
    )
    document.addEventListener(
      eventName.slice(2).toLowerCase(),
      (event) => {
        dispatchEvent(event, false)
      },
      false
    )
    document[eventName] = true
  }
}

function dispatchEvent(event, isCapture) {
  // why do event delegation: why handle all sub dom event to sup class?
  // 1. reduce event binding, increase performance
  // 2. unified event handler, implete synthetic event
  // target: event source -> button, type: event name -> click
  const { target, type } = event
  let eventType = `on${type}` // onclick
  let eventTypeCapture = `on${type}capture` // onclick
  let syntheticEvent = createSyntheticEvent(event)
  updateQueue.isBatchingUpdate = true
  // for implement of React source code, we need to simulate process of capture and bubbling
  // record stack
  let targetStack = []
  let currentTarget = target // button
  while (currentTarget) {
    targetStack.push(currentTarget) // button div#counter div#root document
    currentTarget = currentTarget.parentNode
  }
  if (isCapture) {
    // deal with capture phase
    for (let i = targetStack.length - 1; i >= 0; i--) {
      const currentTarget = targetStack[i]
      let { store } = currentTarget
      let handler = store && store[eventTypeCapture]
      handler && handler(syntheticEvent)
    }
  } else {
    // deal with bubble phase
    for (let i = 0; i < targetStack.length; i++) {
      const currentTarget = targetStack[i]
      let { store } = currentTarget
      let handler = store && store[eventType]
      handler && handler(syntheticEvent)
    }
  }
  // 1. get current event target source (document)
  // event has target->source that triggered event; currentTarget-> current event source
  // set isBatchingUpdate to true before execute event handler open batch update
  // this is batch update
  updateQueue.batchUpdate()
}

/**
 * create synthetic event based on native event object
 * 1. compatibility
 * @param {*} event
 */
function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {}
  for (let key in nativeEvent) {
    let value = nativeEvent[key]
    if (typeof value === 'function') value = value.bind(nativeEvent)
    syntheticEvent[key] = value
  }
  syntheticEvent.nativeEvent = nativeEvent
  // whether prevented native event
  syntheticEvent.isDefaultPrevented = false
  syntheticEvent.preventDefault = preventDefault
  syntheticEvent.isPropagationStopped = false
  syntheticEvent.stopPropagation = stopPropagation
}

// compatibility
function preventDefault() {
  this.isDefaultPrevented = true
  const nativeEvent = this.nativeEvent
  if (nativeEvent.preventDefault) {
    // modern browser
    nativeEvent.preventDefault()
  } else {
    // IE
    nativeEvent.returnValue = false
  }
}

function stopPropagation() {
  this.isPropagationStopped = true
  const nativeEvent = this.nativeEvent
  if (nativeEvent.stopPropagation) {
    // modern browser
    nativeEvent.stopPropagation()
  } else {
    // IE
    nativeEvent.cancelBubble = true
  }
}
