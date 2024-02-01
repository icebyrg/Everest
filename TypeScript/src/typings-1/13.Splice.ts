export type Splice<
  T extends any[],
  S extends number,
  E extends number,
  I extends any[] = [], // 插入的元素
  SA extends any[] = [], // 开头的索引
  C extends any[] = [], // 统计删除的个数
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S
    ? C["length"] extends E
      ? [...F, ...I, ...R]
      : Splice<R, S, E, I, SA, [...C, null], F>
    : Splice<R, S, E, I, [...SA, null], [...C, null], [...F, L]>
  : any;

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>;
