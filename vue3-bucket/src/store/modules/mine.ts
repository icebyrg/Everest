import { CATOGORY_TYPES, IHomeState } from '@/typings'
import { Module } from 'vuex'
import { IGlobalState } from '..'

const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
}

export default home
