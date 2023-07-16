export type Flat<T extends any[]> = T extends [infer L, ...infer R] ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>] : []

type A = Flat<[1, 2, 3]>
type B = Flat<[1, [2, 3], [4, [5, [6]]]]>
type C = Flat<[]>
type D = Flat<[1]>
