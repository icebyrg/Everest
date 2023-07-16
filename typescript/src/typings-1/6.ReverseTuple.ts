export type ReverseTuple<T extends any[], F extends any[] = []> = T extends [infer L, ...infer R] ? ReverseTuple<R, [L, ...F]> : F

type A = ReverseTuple<[string, number, boolean]>
type B = ReverseTuple<[1, 2, 3]>
type C = ReverseTuple<[]>
