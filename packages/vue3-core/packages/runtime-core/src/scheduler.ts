const queue = []
let isFlushing = false
const resolvePromise = Promise.resolve()

// scheduler for async rendering
export function queueJob(job) {
  if (!queue.includes(job)) {
    // push job into queue
    queue.push(job)
  }
  if (!isFlushing) {
    isFlushing = true
    resolvePromise.then(() => {
      isFlushing = false
      let arr = queue.slice(0)
      queue.length = 0 // in executing could still adding member to queue
      for (let i = 0; i < arr.length; i++) {
        const job = arr[i]
        job()
      }
      arr.length = 0
    })
  }
}
