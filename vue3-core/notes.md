- 依赖收集模型：执行 effect 的时候会产生用户的取值，取值的时候通过 setter 把 activeEffect 记录起来；稍后属性变化了，就去找对象上的属性对应的 effect 处理
