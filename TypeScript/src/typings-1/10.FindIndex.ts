type isEqual<T, U, Success, Fail> = [T] extends [U]
  ? [U] extends [T]
    ? keyof T extends keyof U
      ? keyof U extends keyof T
        ? Success
        : Fail
      : Fail
    : Fail
  : Fail;

export type FindIndex<T extends any[], A, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? isEqual<L, A, F["length"], FindIndex<R, A, [...F, null]>>
  : never;

type a1 = [any, never, 1, "2", true];
type a2 = FindIndex<a1, 1>;
type a3 = FindIndex<a1, 3>;

type x = isEqual<any, number, true, false>;

type x1 = keyof any; // string | number | symbol
type x2 = keyof number;

type f1 = number;
type f2 = Number;

type cc = isEqual<f1, f2, true, false>;
