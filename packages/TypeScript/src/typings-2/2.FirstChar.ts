export type FirstChar<T> = T extends `${infer L}${string}` ? L : never

type A = FirstChar<'BFE'>
