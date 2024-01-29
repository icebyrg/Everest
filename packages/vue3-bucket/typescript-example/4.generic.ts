function createArray<T>(len, value: T): T[] {
  let result = []
  for (let i = 0; i < len; i++) {
    result.push(value)
  }
  return result
}

let arr2 = createArray(3, 'x')

const swap = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]]
}

swap<string, number>(['a', 1])
