function createInvoker(val) {
  const invoker = e => invoker.val(e)
  invoker.val = val
  return invoker
}

function fn(e) {
  console.log(1)
}
function fn2(e) {
  console.log(2)
}

const patchFn = createInvoker(fn)

patchFn()
patchFn.val = fn
patchFn()
patchFn.val = fn2
patchFn()
