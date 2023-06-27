class Animal {
  static type = 'mammal'
  private _name: string = 'Tom'
  get name() {
    return this._name
  }
  set name(newValue) {
    this._name = newValue
  }
}
let animal1 = new Animal()
let animal2 = new Animal()

class Animal2 {
  static getType() {
    console.log('father')

    return 'mammal'
  }
  public eat: () => void
  constructor() {
    this.eat = () => {}
  }
  say(): void {
    console.log('father say')
  }
}
class Mouse extends Animal2 {
  static getType() {
    super.getType()

    return 'mammals'
  }
  say(): string {
    super.say()
    return 'sdad'
  }
}
let mouse = new Mouse()

class Animal3 {
  protected constructor() {}
}
class Monkey extends Animal3 {}

class Singleton {
  static instance = new Singleton()
  private constructor() {}
  static getInstance() {
    return this.instance
  }
}
// Singleton parton
let instance1 = Singleton.getInstance()
let instance2 = Singleton.getInstance()
console.log(instance1 === instance2)
