class Parent {
  house() {}
}

class Child extends Parent {
  car() {}
}

class Grandson extends Child {
  sleep() {}
}

function fn(callback: (instance: Child) => Child) {
  callback(new Grandson())
}
// 参数允许逆变 返回值允许协变
fn((instance: Parent): Grandson => {
  return new Grandson()
})
