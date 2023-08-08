// 先取出第一项 判断是否满足 如果满足 需要递归处理R

export type Filter<T, A> = T extends [infer L, ...infer R]
  ? L extends A
    ? [L, ...Filter<R, A>]
    : Filter<R, A>
  : [];

type A = Filter<[1, "BFE", 2, true, "dev"], number>;
type B = Filter<[1, "BFE", 2, true, "dev"], string>;
type C = Filter<[1, "BFE", 2, any, "dev"], string>;

type x = [any] extends [string] ? 1 : 2;
