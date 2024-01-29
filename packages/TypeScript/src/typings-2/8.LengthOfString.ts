export type LengthOfString<
  T extends string,
  A extends any[] = []
> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [...A, null]>
  : A["length"];

type A = LengthOfString<"BFE.dev">;
