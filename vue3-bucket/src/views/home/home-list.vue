<template>
  <div>
    <van-card v-for="ll in lessonList" :key="ll.id" :price="ll.price" :title="ll.title" :thumb="ll.poster">
      <template #tags>
        <van-tag plain type="danger">
          {{ ll.category }}
        </van-tag>
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { ILesson } from '@/typings'
import { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    lessonList: {
      type: [] as PropType<ILesson[]>,
    },
  },
  setup() {
    function formateCategory(type: number) {
      switch (type) {
        case 1:
          return 'react'
          break
        case 2:
          return 'vue'
        default:
          break
      }
    }
  },
})
</script>
