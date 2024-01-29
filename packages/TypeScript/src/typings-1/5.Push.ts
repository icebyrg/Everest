export type Push<T extends any[], I> = [...T, I]

type A = Push<[1, 3, 4], 4>
type B = Push<[1], 2>
