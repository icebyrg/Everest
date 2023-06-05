<template>
  <van-swipe v-if="sliderList.length" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="l in sliderList" :key="l.url"> <img :src="l.url" style="max-width: 100%" /></van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { IGlobalState } from '@/store'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import * as Types from '@/store/action-types'

export default defineComponent({
  name: 'HomeList',
  async setup() {
    let store = useStore<IGlobalState>()
    let sliderList = computed(() => store.state.home.sliders)
    if (sliderList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }
    return {
      sliderList,
    }
  },
})
</script>
