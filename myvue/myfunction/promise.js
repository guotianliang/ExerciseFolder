class Promise{
    constructor(executor){
      // 初始化state为等待态
      this.state = 'pending';
      // 成功的值
      this.value = undefined;
      // 失败的原因
      this.reason = undefined;
       // 成功存放的数组
      this.onResolvedCallbacks = [];
        // 失败存放法数组
      this.onRejectedCallbacks = [];
      let resolve = value => {
        // state改变,resolve调用就会失败
        if (this.state === 'pending') {
          // resolve调用后，state转化为成功态
          this.state = 'fulfilled';
          // 储存成功的值
          this.value = value;
          this.onResolvedCallbacks.forEach(fn=>fn());
        }
      };
      let reject = reason => {
        // state改变,reject调用就会失败
        if (this.state === 'pending') {
          // reject调用后，state转化为失败态
          this.state = 'rejected';
          // 储存失败的原因
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fn=>fn());
        }
      };
      // 如果executor执行报错，直接执行reject
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
     // then 方法 有两个参数onFulfilled onRejected
    then(onFulfilled,onRejected) {
         // 声明返回的promise2
        let promise2 = new Promise((resolve, reject)=>{
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                resolvePromise(promise2, x, resolve, reject);
            };
            if (this.state === 'rejected') {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            };
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(()=>{
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                this.onRejectedCallbacks.push(()=>{
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        });
        // 返回promise，完成链式
        return promise2;
    }
}
function resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    if(x === promise2){
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') {
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
let mypromise=new Promise((reslove,reject)=>{
    console.log(3)
    reslove(3)
    console.log(4)
});
mypromise.then(res=>{
    console.log(res,11)
})
console.log(mypromise)