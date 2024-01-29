import { CamelCase } from "./10.CamelCase";

type a1 = {
  "handle-open": (flag: boolean) => true;
  "preview-item": (data: { item: any; index: number }) => true;
  "close-item": (data: { item: any; index: number }) => true;
};

type a2 = ComponentEmitsType<a1>;

export type ComponentEmitsType<T> = {
  [K in keyof T as `on${CamelCase<K & string>}`]: T[K] extends (
    ...args: infer P
  ) => any
    ? (...args: P) => void
    : T[K];
};
