export type IsAny<T> = unknown extends T
  ? [T] extends [boolean]
    ? true
    : false
  : false;

type A = IsAny<string>;
type B = IsAny<any>;
type C = IsAny<unknown>;
type D = IsAny<never>;

// strictly distinguish any from unknown

// type x= any extends any? true:false
