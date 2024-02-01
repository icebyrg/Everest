export type IsNever<T> = [T] extends [never] ? true : false;

type A = IsNever<never>;
type B = IsNever<string>;
type C = IsNever<undefined>;
type D = IsNever<any>;

// never 默认使用extends的时候就会分发 最终直接返回never
