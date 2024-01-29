// ['length'] 取到数组的长度 在ts中和数量相关的全部采用 元组的长度来计算

export type Repeat<T, C, F extends any[] = []> = C extends F['length'] ? F : Repeat<T, C, [...F, T]>

type A = Repeat<number, 3>
type B = Repeat<string, 2>
type C = Repeat<1, 1>
type D = Repeat<0, 0>
