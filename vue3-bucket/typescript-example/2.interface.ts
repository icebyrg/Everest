interface ISchool {
  readonly name: string
  age: number
  address?: string
}

let school: ISchool = {
  name: 'Alice',
  age: 10,
}

interface ITeacher extends ISchool {
  type: string
  [key: string]: any
}

let teacher: ITeacher = {
  ...school,
  type: 'teacher',
  a: 1,
  b: 2,
}

let school2: ISchool = {
  name: 'Bob',
  age: 20,
  address: 'Beijing',
  lessons: ['math', 'english'],
} as ISchool

let a: number = 1
