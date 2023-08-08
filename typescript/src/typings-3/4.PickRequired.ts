import { RequiredKeys } from "./3.RequiredKeys";

export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

type a1 = PickRequired<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>;
type a2 = PickRequired<{ foo: number; bar?: string }>;
type a3 = PickRequired<{ foo: number; flag: boolean }>;
type a4 = PickRequired<{ foo?: number; flag?: boolean }>;
type a5 = PickRequired<{}>;
