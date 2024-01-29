export type UnionToIntersection<T> = (
  T extends any ? (a: T) => any : never
) extends (p: infer R) => any
  ? R
  : never;

type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>;

// -------

// 函数的逆变和协变 当给一个函数赋值的时候 参数可以传父亲 返回值可以返回儿子

// type A1 =
//   | ((a: { a: number }) => "person")
//   | ((a: { b: string }) => "dog")
//   | ((a: { c: boolean }) => "horse");

// 一个函数的联合类型 参数会变成交叉类型
// let a1: A1 = (a: { a: number }): "person" => "person";
// 传递的时候可以传父返子
// 儿子：{a:number;b:string;c:boolean} 父亲：{a:number}
// 我在给函数赋值的时候 赋予的参数是父类型
// a1();

// let a1: A1 = (a: { a: number; b: string; c: boolean }): "person" => "person";

// type T1 = { name: string };
// type T2 = { age: number };

// type ToInterSection<T> = T extends [(x: infer X) => any, (x: infer X) => any]
//   ? X
//   : any;
// type T3 = ToInterSection<[(x: T1) => any, (x: T2) => any]>;
