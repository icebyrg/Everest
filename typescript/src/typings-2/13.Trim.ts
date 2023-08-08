export type TrimLeft<T extends string> = T extends ` ${infer R}`
  ? TrimLeft<R>
  : T;

export type TrimRight<T extends string> = T extends `${infer L} `
  ? TrimRight<L>
  : T;

type Trim<T extends string> = TrimLeft<TrimRight<T>>;

type a1 = Trim<" .jiang ">;
