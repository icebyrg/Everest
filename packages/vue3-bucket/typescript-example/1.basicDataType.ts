const str: string = 'hello world'
const num: number = 123
const bool: boolean = true
let age: string | number = 18
const arr: number[] = [1, 2, 3]
const tuple: [string, number] = ['1', 2]
console.log(tuple)

let n: null = null
let u: undefined = undefined

enum USER_ROLE {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

const array = [{}, 'a', 123]

const create = (o: object): void => {
  console.log(o)
}

create({ prop: 0 })
create(null)
create([])
create(() => {})
