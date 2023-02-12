export namespace Zoo {
  export class Dog {
    a = 1
  }
}

export namespace Zoo {
  export class Monkey {}
}

export namespace Home {
  export class Dog {}
}

export namespace Earth {
  export namespace Country {
    export class China {}
    export class America {}
  }
}

console.log(Zoo.Dog)
console.log(Home.Dog)
console.log(Earth.Country.America)

class A {
  static b = 'hello B'
}

namespace A {
  export let a = 'hello A'
}

function counter(): number {
  return counter.count++
}

namespace counter {
  export let count = 0
}

enum ROLE {
  user = 0,
}
namespace ROLE {
  export let admin = 1
}

ROLE.admin
