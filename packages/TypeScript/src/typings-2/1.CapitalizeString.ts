export type CapitalizeString<T> = T extends string ?
  `${Capitalize<T>}` : T


type a1 = CapitalizeString<"handler">
type a2 = CapitalizeString<"parent">
