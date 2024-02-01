function fn1(callback: (a: string | number) => boolean | string) {
  // callback
}

fn1((a: string | number | boolean) => {
  return 'abc'
})

type Arg<T> = (arg: T) => void

type xx = Arg<boolean | string | number> extends Arg<string | number> ? true : false
