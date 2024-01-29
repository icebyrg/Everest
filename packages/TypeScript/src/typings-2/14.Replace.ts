export type Replace<
  T extends string,
  C extends string,
  RC extends string,
  F extends string = ""
> = C extends ""
  ? T extends ""
    ? RC
    : `${RC}${T}`
  : T extends `${infer L}${C}${infer R}`
  ? Replace<R, C, RC, `${F}${L}${RC}`>
  : `${F}${T}`;

type a1 = Replace<"123 ha ha ha 123", "ha", "he">;
type a2 = Replace<"robot", "robot", "newRobot">;
type a3 = Replace<"-rose", "", "jack">;
type a4 = Replace<"", "", "jack">;
