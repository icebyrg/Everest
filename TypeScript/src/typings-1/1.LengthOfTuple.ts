export type LengthOfTuple<T extends any[]> = T['length']
type A = LengthOfTuple<['b', 'f', 'c']>
type B = LengthOfTuple<[]>
