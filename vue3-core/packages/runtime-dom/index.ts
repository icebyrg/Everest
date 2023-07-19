import { nodeOps } from './nodeOps'
import { patchProp } from './props'

const renderOptions = {
  ...nodeOps,
  patchProp,
}
