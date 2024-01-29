export {};

type Filter<T, A> = T extends [infer R, ...infer L]
  ? R extends A
    ? [R, ...Filter<L, A>]
    : Filter<L, A>
  : [];

type A = Filter<[1, "BFE", 2, true, "dev"], number>;
type B = Filter<[1, "BFE", 2, true, "dev"], string>;
type C = Filter<[1, "BFE", 2, true, "dev"], string>;
