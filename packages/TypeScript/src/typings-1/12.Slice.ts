type Slice<
  T extends any[],
  S extends number, // 开始位置
  E extends number = T["length"], // 结束位置
  SA extends any[] = [], // 记录是否到达S
  EA extends any[] = [], // 记录是否到达E
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S // 只有当前索引和传入的长度相同时才会传入 后续长度就不累加了 将其他的全部放入
    ? EA["length"] extends E // 如果放入的索引到达了结尾 意味着放完了 那就把当前的这一项放到数组里结束
      ? [...F, L] // 返回最终slice的结果
      : Slice<R, S, E, SA, [...EA, null], [...F, L]> // 看一下开头是否满足传入的开头 如果满足则放到队列中
    : Slice<R, S, E, [...SA, null], [...EA, null], F> // null意味着让数组++
  : F;

type A1 = Slice<[any, never, 1, "2", true, boolean], 0, 2>;
type A2 = Slice<[any, never, 1, "2", true, boolean], 1, 3>;
type A3 = Slice<[any, never, 1, "2", true, boolean], 1, 2>;
type A4 = Slice<[any, never, 1, "2", true, boolean], 2>;
type A5 = Slice<[any], 2>;
type A6 = Slice<[], 0>;

// 1) 达到开头的位置 就往里面添加
// 2) 如果没达到 就舍弃掉
// 3) 达到后 看一下是否到达结尾 没到结尾就放入
// 4) 到了就返回
