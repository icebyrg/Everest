// packages/reactivity/src/effect.ts
var activeEffect = void 0;
function cleanupEffect(effect3) {
  let deps = effect3.deps;
  for (let i = 0; i < deps.length; i++) {
    deps[i].delete(effect3);
  }
  effect3.deps.length = 0;
}
var ReactiveEffect = class {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.parent = void 0;
    this.deps = [];
  }
  run() {
    try {
      this.parent = activeEffect;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = void 0;
    }
  }
};
function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  return runner;
}

// packages/shared/src/index.ts
function isObject(val) {
  return typeof val === "object" && val !== null;
}
function isFunction(val) {
  return typeof val === "function";
}

// packages/reactivity/src/baseHandler.ts
var mutableHandlers = {
  get(target, key, receiver) {
    if (key === "__v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
    track(target, key);
    let result = Reflect.get(target, key, receiver);
    if (isObject(result)) {
      return reactive(result);
    }
    return result;
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    let flag = Reflect.set(target, key, value, receiver);
    if (value !== oldValue) {
      trigger(target, key, value, oldValue);
    }
    return flag;
  }
};
var targetMap = /* @__PURE__ */ new WeakMap();
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    trackEffects(dep);
  }
}
function trigger(target, key, value, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap)
    return;
  let effects = depsMap.get(key);
  triggerEffects(effects);
}
function triggerEffects(effects) {
  if (effects) {
    effects = [...effects];
    effects.forEach((effect3) => {
      if (activeEffect !== effect3) {
        if (effect3.scheduler) {
          effect3.scheduler();
        } else {
          effect3.run();
        }
      }
    });
  }
}
function trackEffects(dep) {
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

// packages/reactivity/src/reactive.ts
function reactive(target) {
  return createReactiveObject(target);
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
function createReactiveObject(target) {
  if (!isObject(target))
    return;
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    return target;
  }
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
function isReactive(source) {
  return !!(source && source["__v_isReactive" /* IS_REACTIVE */]);
}
function toReactive(source) {
  return isObject(source) ? reactive(source) : source;
}

// packages/reactivity/src/computed.ts
var ComputedRefImpl = class {
  constructor(getter, setter) {
    this.getter = getter;
    this.setter = setter;
    this.dep = /* @__PURE__ */ new Set();
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerEffects(this.dep);
      }
    });
  }
  get value() {
    if (activeEffect) {
      trackEffects(this.dep);
    }
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(val) {
    this.setter(val);
  }
};
function computed(getterOrOptions) {
  const isGetter = isFunction(getterOrOptions);
  let getter;
  let setter;
  if (isGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.log("computed is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter);
}

// packages/reactivity/src/watch.ts
function traverse(source, seen = /* @__PURE__ */ new Set()) {
  if (!isObject(source))
    return source;
  if (seen.has(source))
    return source;
  seen.add(source);
  for (let k in source) {
    traverse(source[k], seen);
  }
  return source;
}
function doWatch(source, cb, options = {}) {
  let getter;
  if (isReactive(source)) {
    getter = () => traverse(source);
  } else if (isFunction(source)) {
    getter = source;
  }
  let oldValue;
  let clean;
  const onCleanup = (fn) => {
    clean = fn;
  };
  const job = () => {
    if (cb) {
      if (clean)
        clean();
      const newValue = effect3.run();
      cb(newValue, oldValue, onCleanup);
      oldValue = newValue;
    } else {
      effect3.run();
    }
  };
  const effect3 = new ReactiveEffect(getter, job);
  oldValue = effect3.run();
  if (options.immediate) {
    job();
  }
}
function watchEffect(effect3, options = {}) {
  doWatch(effect3, null, options);
}
function watch(source, cb, options = {}) {
  doWatch(source, cb, options);
}

// packages/reactivity/src/ref.ts
function ref(value) {
  return new RefImpl(value);
}
var RefImpl = class {
  constructor(rawValue) {
    this.rawValue = rawValue;
    this.dep = /* @__PURE__ */ new Set();
    this._value = toReactive(rawValue);
  }
  get value() {
    if (activeEffect)
      trackEffects(this.dep);
    return this._value;
  }
  set value(newValue) {
    if (newValue !== this.rawValue) {
      this.rawValue = newValue;
      this._value = toReactive(newValue);
      triggerEffects(this.dep);
    }
  }
};
var ObjectRefImpl = class {
  constructor(object, key) {
    this.object = object;
    this.key = key;
  }
  get value() {
    return this.object[this.key];
  }
  set value(val) {
    this.object[this.key] = val;
  }
};
function toRef(object, key) {
  return new ObjectRefImpl(object, key);
}
function toRefs(object) {
  let res = {};
  for (let key in object) {
    res[key] = toRef(object, key);
  }
  return res;
}
export {
  ReactiveEffect,
  activeEffect,
  computed,
  effect,
  isReactive,
  reactive,
  ref,
  toReactive,
  toRef,
  toRefs,
  watch,
  watchEffect
};
//# sourceMappingURL=reactivity.js.map
