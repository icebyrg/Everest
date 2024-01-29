export type StringToTuple<T, F extends any[] = []> = T extends `${infer L}${infer R}`
  ? StringToTuple<R, [...F, L]> : F

type A = StringToTuple<'BFE.dev'>
