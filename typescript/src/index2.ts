import 'reflect-metadata'

class Animal {
  static type = 'Mammal'
  eat() {}
  drink() {}
}

Reflect.defineMetadata('Class', 'Class metadata', Animal)
asdasdasd
