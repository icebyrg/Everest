import { FindIndex } from "./10.FindIndex";

export type TupleToEnum<T extends any[], I = false> = {
  readonly [K in T[number]]: I extends true ? FindIndex<T, K> : K;
};

type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>;

type a2 = TupleToEnum<["MacOS", "Windows", "Linux"]>;
