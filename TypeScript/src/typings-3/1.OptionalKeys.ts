export type OptionalKeys<T, K = keyof T> = K extends keyof T // 触发分发 因为要拿到每一个属性
  ? Omit<T, K> extends T // 将当前每次分发后的属性忽略掉 看是否能赋予给原来的Key
    ? K // 如果可以 说明这个属性是可选的
    : never
  : never;

// 分发的条件 1.裸类型 2.条件 3.是泛型
type A<T, K = keyof T> = K extends keyof T ? K : false;

type X = A<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>;

type a1 = OptionalKeys<{
  foo?: number | undefined;
  bar?: string;
  flag: boolean;
}>;

type x1 = {
  foo?: number | undefined;
  bar?: string;
  flag: boolean;
};

type x2 = Omit<x1, "foo">;
let x1!: x1;
let x2!: x2;

x1 = x2;

export {};
