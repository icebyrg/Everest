// 2 5 8 9 7 4 6 11
// length of longest subsequence

// 贪心算法
// 我们找序列中更有潜力的那一个 比最后一个大的 直接放到队列中 如果比最后一个小 则将它替换到队列中比它第一个大的那一项（二分查找）

// 贪心算法+二分查找+追溯

// 2
// 2 5
// 2 5 8
// 2 5 8 9
// 2 5 7 9
// 2 4 7 9
// 2 4 6 9
// 2 4 6 9 11

// 追溯
// 2 5 8 9 11 = 5

// [1,2,3,4,5]->[0,1,2,3,4]

function getSeq(arr) {
  const result = [0]
  const len = arr.length // 总长度
  let resultLastIndex
  let start
  let end
  let middle = 0
  let p = arr.slice(0)
  for (let i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI != 0) {
      // get last item in sequence
      resultLastIndex = result[result.length - 1]
      if (arr[resultLastIndex] < arrI) {
        result.push(i)
        p[i] = resultLastIndex // 记录它的前一个值的索引
        continue
      }
      // ... 替换
      start = 0
      end = result.length - 1
      while (start < end) {
        // start to end
        middle = ((start + end) / 2) | 0
        // 结果集中间的那一项的值
        // 1 2 3 4 6  -1
        if (arr[result[middle]] < arrI) {
          start = middle + 1
        } else {
          end = middle
        }
      }
      // start === end
      if (arrI < arr[result[end]]) {
        p[i] = result[end - 1]
        // [1,2,3]
        result[end] = i // 发现最后找到的索引比这一项大 那就用这个索引换掉 因为更有潜力
      }
    }
  }
  let i = result.length
  let last = result[i - 1] // 拿到 9(末尾项) 的索引向上找
  while (i-- > 0) {
    result[i] = last
    last = p[last] // 追溯上一次的值
  }
  return result
}

console.log(getSeq([2, 3, 1, 5, 6, 8, 7, 9, 4]))

// 2 4 6 9 11 -> [0,5,6,3,7]
