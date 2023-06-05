<template>
  <div class="home">
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory"></HomeHeader>
    <div class="home-container" ref="refreshElm">
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
      <div class="home-container" style="margin-top: 65px">{{ category }}</div>
      <HomeSwiper></HomeSwiper>
      <HomeList :lessonList="lessonList"></HomeList>
      <div v-if="isLoading">loading....</div>
      <div v-if="!hasMore">no more</div>
    </div>
  </div>
</template>

<style lang="scss">
.home-container {
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>

<script lang="ts">
import { IGlobalState } from '@/store'
import { defineComponent } from 'vue'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import { Store, useStore } from 'vuex'
import { computed } from '@vue/reactivity'
import { CATOGORY_TYPES } from '@/typings'
import * as Types from '@/store/action-types'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useLoadMore } from '@/hooks/useLoadMore'

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory)
  function setCurrentCategory(category: CATOGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category)
  }
  return {
    category,
    setCurrentCategory,
  }
}

function useLessonList(store: Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list)
  onMounted(() => {
    if (lessonList.value.length === 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })
  return {
    lessonList,
  }
}

export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    let store = useStore<IGlobalState>()
    let { category, setCurrentCategory } = useCategory(store)
    let { lessonList } = useLessonList(store)
    const refreshElm = ref<null | HTMLElement>(null)
    const { isLoading, hasMore } = useLoadMore(refreshElm, store, `home/${Types.SET_LESSON_LIST}`)
    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore,
    }
  },
})
</script>
