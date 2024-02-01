export type Include<T extends string, C extends string> = C extends ""
  ? T extends string
    ? true
    : false
  : T extends `${infer L}${C}${infer R}`
  ? true
  : false;

type a1 = Include<"Jiang", "J">;
type a2 = Include<"Jiang", "i">;
type a3 = Include<"", "">;
type a4 = Include<"", "a">;
