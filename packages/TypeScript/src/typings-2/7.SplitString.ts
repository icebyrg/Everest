export type SplitString<
  T,
  S extends string,
  F extends any[] = []
> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...F, L]>
  : [...F, T];

type A1 = SplitString<"handle-open-flag", "-">;
