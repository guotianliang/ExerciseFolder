function isObject(val) {
  return typeof val === "object" && val !== null;
}
function hasOwn(target, key) {
  return target.hasOwnProperty[key];
}
// WeakMap: 弱引用映射表
// 原对象 : 代理过的对象
let toProxy = new WeakMap();
// 代理过的对象:原对象
let toRaw = new WeakMap();
// 响应式核心方法
function reactive(target) {
  // 创建响应式对象
  return createReactiveObject(target);
}
function createReactiveObject(target) {
  // 如果当前不是对象，直接返回即可
  if (!isObject(target)) {
    return target;
  }
  // 如果已经代理过了，就直接返回代理过的结果
  let proxy = toProxy.get(target);
  if (proxy) {
    return proxy;
  }
  // 防止代理过的对象再次被代理
  if (toRaw.has(target)) {
    return target;
  }
  let baseHandler = {
    get(target, key, receiver) {
      // Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。
      let res = Reflect.get(target, key, receiver);
      // 收集依赖/订阅 把当前的key和effect做映射关系
      track(target, key);
      // 在get取值的时候才去判断该值是否是一个对象，如果是则递归（这里相比于Vue2中的默认递归，其实是一种优化）
      return isObject(res) ? reactive(res) : res;
    },
    set(target, key, value, receiver) {
      // 这里需要区分是新增属性还是修改属性
      let hasKey = hasOwn(target, key);
      let oldVal = target[key];
      let res = Reflect.set(target, key, value, receiver);
      if (!hasKey) {
        console.log("新增属性");
        trigger(target, "add", key);
      } else if (oldVal !== value) {
        console.log("修改属性");
        trigger(target, "set", key);
      }
      return res;
    },
    deleteProperty(target, key) {
      let res = Reflect.deleteProperty(target, key);
      return res;
    },
  };
  let observed = new Proxy(target, baseHandler);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

// 栈 先进后出 {name:[effect]}
let activeEffectStacks = [];
let targetsMap = new WeakMap();
// 如果target中的key发生变化了，就执行数组里的方法
function track(target, key) {
  // 拿出栈顶函数
  let effect = activeEffectStacks[activeEffectStacks.length - 1];
  if (effect) {
    // 获取target对应依赖表
    let depsMap = targetsMap.get(target);
    if (!depsMap) {
      targetsMap.set(target, (depsMap = new Map()));
    }
    console.log(targetsMap,"targetsMap")
    // 获取key对应的响应函数集
    let deps = depsMap.get(key);
    // 动态创建依赖关系
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }
    if (!deps.has(effect)) {
      deps.add(effect);
    }
  }
}
function trigger(target, type, key) {
  let depsMap = targetsMap.get(target);
  if (depsMap) {
    let deps = depsMap.get(key);
    if (deps) {
      // 将当前key对应的effect依次执行
      deps.forEach((effect) => {
        effect();
      });
    }
  }
}
// 响应式 副作用
function effect(fn) {
  const rxEffect = function () {
    try {
      // 捕获异常
      // 运行fn并将effect保存起来
      activeEffectStacks.push(rxEffect);
      return fn();
    } finally {
      activeEffectStacks.pop();
    }
  };
  // 默认应该先执行一次
  rxEffect();
  // 返回响应函数
  return rxEffect;
}

let obj = reactive({ name: "cosen",age:{name:"123"} });
effect(() => {
  console.log(obj.name);
});
obj.age.name = "senlin";
