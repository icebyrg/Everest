import { CATOGORY_TYPES, IHomeState, ILesson, ILessons, ISlider } from '@/typings'
import { Module } from 'vuex'
import { IGlobalState } from '..'
import * as Types from '../action-types'
import { getLessons, getSliders } from '@/api/home'

const state: IHomeState = {
  currentCategory: CATOGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true,
    loading: false,
    offset: 0,
    limit: 5,
    list: [],
  },
}

const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload: CATOGORY_TYPES) {
      state.currentCategory = payload
    },
    [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
      state.sliders = payload
    },
    [Types.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload
    },
    [Types.SET_LESSON_LIST](state, payload: ILessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore
      state.lessons.offset = state.lessons.offset + payload.list.length
    },
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      let sliders = await getSliders<ISlider>()
      commit(Types.SET_SLIDER_LIST, sliders)
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      if (state.lessons.loading) return
      if (!state.lessons.hasMore) return
      commit(Types.SET_LOADING, true)
      let lessons = await getLessons<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit)
      commit(Types.SET_LESSON_LIST, lessons)
      commit(Types.SET_LOADING, false)
    },
  },
}

export default home
