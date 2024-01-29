import { OptionalKeys } from "./1.OptionalKeys";

export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

type a1 = PickOptional<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>;

type a2 = PickOptional<{ foo: number; bar?: string }>;
type a3 = PickOptional<{ foo: number; flag: boolean }>;
type a4 = PickOptional<{ foo?: number; flag?: boolean }>;
type a5 = PickOptional<{}>;
