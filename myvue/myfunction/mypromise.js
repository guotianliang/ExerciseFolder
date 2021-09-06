/**
 *  promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
    new promise时， 需要传递一个executor()执行器，执行器立即执行；
    executor接受两个参数，分别是resolve和reject；
    promise  的默认状态是 pending；
    promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
    promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
    promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
    promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
    如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
    如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
    如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
 *
 *
 */
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
new Promise((res)=>{
    throw 123
},(rej)=>{
    console.log(rej)
})
class Promise {
    constructor(executor) {
        // 默认状态为 PENDING
        this.status = PENDING;
        // 存放成功状态的值，默认为 undefined
        this.value = undefined;
        // 存放失败状态的值，默认为 undefined
        this.reason = undefined;

          // 调用此方法就是成功
        let resolve = (value) => {
            // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
            if(this.status ===  PENDING) {
                // resolve调用后，state转化为成功态
                this.status = FULFILLED;
                // 储存成功的值
                this.value = value;
            }
        }
        let reject = reason => {
            // state改变,reject调用就会失败
            if (this.state === PENDING) {
                // reject调用后，state转化为失败态
                this.state = REJECTED;
                // 储存失败的原因
                this.reason = reason;
            }
        };
        // 如果executor执行报错，直接执行reject
        try{
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
}
// 1. 定义 status 状态
// 2. fn1, fn2 的数组
// 3. 定义 resolve reject 方法
// 4. executor 执行
function Promise(executor) {
    let self = this;

    self.status = 'pending';
    self.fn1Callback = [];
    self.fn2Callback = [];

    // resolve 做到事情
    // 1. 修改this 实例的状态
    // 2. 修改this 这里的data
    // 3. 遍历执行 this fn1Callback 上挂载的方法
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (let i = 0; i < self.fn1Callback.length; i++) {
                    self.fn1Callback[i](value);
                }
            }
        });
    }
    function reject(reason) {
        setTimeout(() => { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                for (let i = 0; i < self.fn2Callback.length; i++) {
                    self.fn2Callback[i](reason);
                }
            }
        });
    }

    try {
        executor(resolve, reject);
    } catch (reason) {
        reject(reason);
    }
}
// one year 100
// one mouth 10
// 微信小程序

// 1. 参数校验
// 2. 根据 statue, 执行 fn1, fn2 或者把 执行fn1, fn2的行为保存在数组
// 3. 把 fn1，fn2 的返回值, 使用 resolvePromise 包裹成 promise
Promise.prototype.then = function (fn1, fn2) {
    let self = this;
    let promise2;
    fn1 = typeof fn1 === 'function' ? fn1 : function (v) {
        return v;
    };
    fn2 = typeof fn2 === 'function' ? fn2 : function (r) {
        throw r;
    };

    // 执行到 then, 并不确定 promise 状态已经是 resolved
    if (self.status === 'resolved') {
        // then() 执行后，返回一个promise, promise 的值
        return promise2 = new Promise(((resolve, reject) => {
            setTimeout(() => { // 异步执行onResolved
                try {
                    // 执行 fn1()，拿到结果 x
                    // fn1是用户传入的，那fn1返回值, 可能性可就多了
                    let x = fn1(self.data);
                    // 如果 x 是简单值，直接 resolve(x);
                    // resolve(x);
                    // 需要使用 resolvePromise 方法封装
                    resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise(((resolve, reject) => {
            setTimeout(() => { // 异步执行onRejected
                try {
                    let x = fn2(self.data);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }

    if (self.status === 'pending') {
        // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
        return promise2 = new Promise(((resolve, reject) => {
            // 先定义一个方法，把方法 挂载到 onResolvedCallback 数组上
            // 方法里面 就是 调用传入的 fn1
            self.onResolvedCallback.push((value) => {
                try {
                    let x = fn1(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });

            self.onRejectedCallback.push((reason) => {
                try {
                    let x = fn2(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }
};

// 1. 普通值
// 2. promise 值
// 3. thenable 的值，执行 then
function resolvePromise(promise2, x, resolve, reject) {
    // 为了防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    // 如果 x 是 promise
    if (x instanceof Promise) {
        x.then(function (data) {
            resolve(data)
        }, function (e) {
            reject(e)
        });
        return;
    }

    // 如果 x 是 object 类型或者是 function
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 拿x.then可能会报错
        try {
            // 先拿到 x.then
            var then = x.then;
            var called
            if (typeof then === 'function') {
                // 这里的写法，是 then.call(this, fn1, fn2)
                then.call(x, (y) => {
                    // called 是干什么用的呢？
                    // 有一些 promise 实现的不是很规范，瞎搞的，比如说，fn1, fn2 本应执行一个，
                    // 但是有些then实现里面，fn1, fn2都会执行
                    // 为了 fn1 和 fn2 只能调用一个, 设置一个 called 标志位
                    if (called) {
                        return;
                    }
                    called = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            return reject(e);
        }
    } else {
        resolve(x);
    }
}
Promise.all = function (arr) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            throw new Error(`argument must be a array`)
        }
        let dataArr = [];
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            let p = arr[i];
            p.then((data) => {
                dataArr.push(data);
                num ++;
                if (num === arr.length) {
                    return resolve(data)
                }
            }).catch((e) => {
                return reject(e)
            })
        }
    })
}
const list=[]
const tree={"n":"博瑞开源","t":"o","fn":"/博瑞开源","id":1,"l":0,"items":[{"n":"专家库","t":"o","fn":"/博瑞开源/专家库","id":2,"l":1},{"n":"分公司","t":"o","fn":"/博瑞开源/分公司","id":3,"l":1,"items":[{"n":"业务部","t":"o","fn":"/博瑞开源/分公司/业务部","id":7,"l":2,"items":[{"n":"业务一部","t":"o","fn":"/博瑞开源/分公司/业务部/业务一部","id":8,"l":3},{"n":"业务二部","t":"o","fn":"/博瑞开源/分公司/业务部/业务二部","id":9,"l":3}]},{"n":"技术部","t":"o","fn":"/博瑞开源/分公司/技术部","id":4,"l":2,"items":[{"n":"技术一部","t":"o","fn":"/博瑞开源/分公司/技术部/技术一部","id":5,"l":3},{"n":"技术二部","t":"o","fn":"/博瑞开源/分公司/技术部/技术二部","id":6,"l":3}]}]}]}
// tree 树
// children 树的子
// id 树对应的id
// name 要提取的元素
function treeFn(tree,id,children,name){
  let target;
  tree.forEach()
  if(tree.id===id){
    target =  tree[name]
  }
  if(tree[children]){
    tree[children].forEach(v => {
      if(target){
        return
      }
      target=treeFn([v],children,id,name)
      
    });
  }
  return target
}
let aa = treeFn(tree,8,'items','n')