export type IsEmptyType<T> = keyof T extends never
  ? unknown extends T // unknown is only assignable to unknown / any
    ? false
    : boolean extends T // exclude {} that is extendable to all types
    ? true
    : false
  : false;
type A = IsEmptyType<string>;
type B = IsEmptyType<{ a: 3 }>;
type C = IsEmptyType<{}>;
type D = IsEmptyType<any>;
type E = IsEmptyType<object>;
type F = IsEmptyType<Object>;
type G = IsEmptyType<unknown>;
type G1 = IsEmptyType<never>;
