export type RemoveFist<T extends string, S> = T extends `${S &
  string}${infer R}`
  ? R
  : T;

export type KebabCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`>
  : RemoveFist<F, "-">;

type a1 = KebabCase<"HandleOpenFlag">;
