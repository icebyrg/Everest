import { OptionalKeys } from "./1.OptionalKeys";

export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

type a1 = RequiredKeys<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>;

type a2 = RequiredKeys<{ foo: number; bar?: string }>;
type a3 = RequiredKeys<{ foo: number; flag: boolean }>;
type a4 = RequiredKeys<{ foo?: number; flag?: boolean }>;
type a5 = RequiredKeys<{}>;
