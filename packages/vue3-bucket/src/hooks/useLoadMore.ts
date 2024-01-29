import { IGlobalState } from '@/store'
import { Ref, onMounted } from 'vue'
import { Store } from 'vuex'
import _ from 'lodash'

export function useLoadMore(refreshElm: Ref<null | HTMLElement>, store: Store<IGlobalState>, type: string) {
  let element: HTMLElement
  function _loadMore() {
    let containerHeight = element.clientHeight
    let scrollTop = element.scrollTop
    let scrollHeight = element.scrollHeight
    if (containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type)
    }
  }
  onMounted(() => {
    element = refreshElm.value as HTMLElement
    element.addEventListener('scroll', _.debounce(_loadMore, 200))
  })
  return {
    isLoading: false,
    hasMore: false,
  }
}
