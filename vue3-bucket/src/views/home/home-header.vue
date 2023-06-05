<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="" />
    <van-dropdown-menu>
      <van-dropdown-item :modelValue="category" :options="options" @change="change"> </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<style lang="scss">
.home-header {
  height: 65px;
  background-color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  img {
    height: 50px;
  }
  .van-dropdown-menu {
    width: 100px;
    .van-dropdown-item {
      color: #fff;
      .van-dropdown-item__title {
        color: #fff;
      }
    }
  }
}
</style>

<script lang="ts">
import { CATOGORY_TYPES } from '@/typings'
import { defineComponent } from 'vue'
import { reactive, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'HomeHeader',
  props: {
    category: {
      type: Number as PropType<CATOGORY_TYPES>,
    },
  },
  emits: ['setCurrentCategory'],
  setup(props: any, context: any) {
    let state = reactive({
      options: [
        {
          text: 'All classes',
          value: CATOGORY_TYPES.ALL,
        },
        {
          text: 'React',
          value: CATOGORY_TYPES.REACT,
        },
        {
          text: 'Vue',
          value: CATOGORY_TYPES.VUE,
        },
        {
          text: 'Node',
          value: CATOGORY_TYPES.NODE,
        },
      ],
    })
    function change(value: CATOGORY_TYPES) {
      context.emit('setCurrentCategory', value)
    }
    return {
      ...toRefs(state),
      change,
    }
  },
})
</script>
