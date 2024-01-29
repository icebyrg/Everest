class Animal {
  constructor(name, legs) {
    this.name = name
    this.legs = legs
  }
}

class Cat extends Animal {
  constructor(name, legs, furColor) {
    // Call the parent class`s constructor
    super(name, legs)
    // Initialize the subclass`s own properties
    this.furColor = furColor
  }
}

const myCat = new Cat('Fluffy', 4, 'gray')
console.log(myCat.name)
