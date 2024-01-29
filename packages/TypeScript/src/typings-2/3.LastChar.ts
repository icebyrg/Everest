export type LastChar<T extends string, F = never> = T extends `${infer L}${infer R}`
  ? LastChar<R, L> : F

type A = LastChar<'BFE'>
type B = LastChar<'dev'>

// 和元组的取值很像
