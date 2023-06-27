export {}

type ResStatusMessage<T> = T extends 200 | 201 | 204 | 206 ? 'success' : 'fail'

type IMessage = ResStatusMessage<200>

type Conditional<T, U> = T extends U ? true : false

type R1 = Conditional<'asd', string>
type R2 = Conditional<'das', number>

type FormatReturnValue<T> = T extends string ? string : T extends number ? number : never
function sum<T extends string | number>(a: T, b: T): FormatReturnValue<T> {
  return a + (b as any)
}
sum(1, 2)

interface Fish {
  name: 'Fish'
}
interface Water {
  type: 'Water'
}
interface Bird {
  name: 'Bird'
}
interface Sky {
  type: 'Sky'
}
type SelectType<T> = T extends Fish ? Water : Sky
type R3 = SelectType<Bird>

type T1 = never extends '213' ? true : false

type T2 = 123 extends number ? true : false
type T3 = 'abc' extends string ? true : false

type T4 = string extends String ? true : false

let temp1: string = '123'
let s: String = temp1
type T5 = string extends Object ? true : false

type T6 = any extends 1 ? true : false

type R4 = Bird | Fish extends Fish ? Water : Sky
type R5 = SelectType<Bird | Fish>
