function sum1(a: string, b: string): string {
  return a + b
}
sum1('a', 'b')

type Sum = ((a: number, b: number) => number) | string
interface ISum {
  (a: number, b: number): number
}
let sum2: Sum = (a: number, b: number): number => {
  return a + b
}
sum2 = 'a'
