import { createStore } from 'vuex'
import home from './modules/home'
import { IHomeState } from '@/typings'

export interface IGlobalState {
  home: IHomeState
}

const store = createStore<IGlobalState>({
  mutations: {},
  actions: {},
  modules: { home },
})

export default store
