// new是关键字,这里我们用函数来模拟,new Foo(args) <=> myNew(Foo, args)
/**
 *
 * @param {*} foo
 * @param  {...any} args
 *  1.创建一个新对象，并继承其构造函数的prototype，这一步是为了继承构造函数原型上的属性和方法
    2.执行构造函数，方法内的this被指定为该新实例，这一步是为了执行构造函数内的赋值操作
    3.返回新实例（规范规定，如果构造方法返回了一个对象，那么返回该对象，否则返回第一步创建的新对象）
 */
function myNew(foo, ...args) {
    // 创建新对象,并继承构造方法的prototype属性, 这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
    let obj = Object.create(foo.prototype)
    console.log(obj,foo.prototype)
    // 执行构造方法, 并为其绑定新this, 这一步是为了让构造方法能进行this.name = name之类的操作, args是构造方法的入参, 因为这里用myNew模拟, 所以入参从myNew传入
    let result = foo.apply(obj, args)

    // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象（一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj
  }

  // 测试：
  function Foo(name) {
    this.name = name
  }
  const newObj = new Foo("hahah");
  // const newObj = myNew(Foo, 'zhangsan')
  console.log(newObj)                 // Foo {name: "zhangsan"}
  console.log(newObj instanceof Foo)


  function newFactory(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    res = ctor.apply(obj, ...args);

    let isObject = typeof res === 'object' && typeof res !== null;
    let isFunction = typeof res === 'function';
    return isObect || isFunction ? res : obj;
};
new Promise(reslove=>{
  reslove(1)
});

class myPromise{
  constructor(cb){
    this.status='PENDING'
    this.resloveFnList=[];
    this.rejectFnList=[];

    const reslove=function(value){
      const run=()=>{
        if(this.status==='PENDING'){
          this.status='FULFILLED'
          this.value=value
          while(this.resloveFnList.length) {    
            const callback = this.resloveFnList.shift()
            callback(value)
          }
        }
      }
      setTimeout(run)
    };
    const reject=function(value){
      if(this.status==='PENDING'){
        this.status='REJECTED'
        while(this.rejectFnList.length) {
          const callback = this.rejectFnList.shift()
          callback(value)
        }
      }
    };
    cb(reslove,reject)
  }
  then(resolveFn,rejectFn){
    typeof resolveFn !== 'function' ? resolveFn = value => value : null
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error(reason instanceof Error? reason.message:reason);
    } : null

    return new myPromise((reslove,reject)=>{

      
    let fulfilledFn=value=>{
      let x = resolveFn(value)
      x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
    }
    const rejectedFn  = error => {
      try {
        let x = rejectFn(error)
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (error) {
        reject(error)
      }
    }
    switch (this._status) {
      // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
      case PENDING:
        this.resloveFnList.push(fulfilledFn)
        this.rejectFnList.push(rejectedFn)
        break;
      // 当状态已经变为resolve/reject时,直接执行then回调
      case FULFILLED:
        fulfilledFn(this._value)    // this._value是上一个then回调return的值(见完整版代码)
        break;
      case REJECTED:
        rejectedFn(this._value)
        break;
    }

    });
  }
//静态的all方法
static all(promiseArr) {
  let index = 0
  let result = []
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        val => {
          index++
          result[i] = val
          //所有then执行后, resolve结果
          if(index === promiseArr.length) {
            resolve(result)
          }
        },
        err => {
          //有一个Promise被reject时，MyPromise的状态变为reject
          reject(err)
        }
      )
    })
  })
}
}