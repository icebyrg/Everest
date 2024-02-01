export type CamelCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`>
  : Capitalize<`${F}${T}`>;

type a1 = CamelCase<"handle-open-flag">;
