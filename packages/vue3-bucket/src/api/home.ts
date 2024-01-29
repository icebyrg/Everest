import { CATOGORY_TYPES } from '@/typings'
import axios from '.'

export function getSliders<T>() {
  return axios.get<T, T>('/slider/list')
}

export function getLessons<T>(category: CATOGORY_TYPES, offest: number = 0, limit: number = 5) {
  return axios.get<T, T>(`/lesson/list?category=${category}&offest=${offest}&limit=${limit}`)
}
