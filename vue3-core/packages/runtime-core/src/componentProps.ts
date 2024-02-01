import { reactive } from '@vue/reactivity'

export function initProps(instance, rawProps) {
  const props = {}
  const attrs = {}
  const options = instance.propsOptions || {}
  if (rawProps) {
    for (let key in rawProps) {
      if (key in options) {
        props[key] = rawProps[key]
      } else {
        attrs[key] = rawProps[key]
      }
    }
  }
  // attributes is reponsive, mutation will cause page update
  instance.props = reactive(props) // props will be responsive
  instance.attrs = attrs
}
