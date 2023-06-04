<template>
  <div class="home">
    {{ category }}
    <HomeHeader></HomeHeader>
    <HomeSwiper></HomeSwiper>
    <HomeList></HomeList>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from '@/store'
import { defineComponent } from 'vue'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import { createStore, useStore } from 'vuex'
import { computed } from '@vue/reactivity'

export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    let store = useStore<IGlobalState>()
    let category = computed(() => {
      return store.state.home.currentCategory
    })
    return {
      category,
    }
  },
})
</script>
