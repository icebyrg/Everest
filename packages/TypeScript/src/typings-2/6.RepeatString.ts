export type RepeatString<
  T extends string,
  C,
  A extends any[] = [],
  F extends string = ""
> = C extends A["length"] ? F : RepeatString<T, C, [...A, T], `${F}${T}`>;

type A = RepeatString<"a", 3>;
type B = RepeatString<"a", 0>;
