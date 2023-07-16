// 先取出第一项 判断是否满足 如果满足 需要递归处理R
export type Filter<T extends any[], A, F extends any[] = []> = T extends [infer L, ...infer R] ? (L extends A ? Filter<R, A, [...F, L]> : Filter<R, A, F>) : F

type A = Filter<[1, 'BFE', 2, true, 'dev'], number>
type B = Filter<[1, 'BFE', 2, true, 'dev'], string>
type C = Filter<[1, 'BFE', 2, true, 'dev'], string>
