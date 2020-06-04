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

    // 执行构造方法, 并为其绑定新this, 这一步是为了让构造方法能进行this.name = name之类的操作, args是构造方法的入参, 因为这里用myNew模拟, 所以入参从myNew传入
    let result = foo.apply(obj, args)

    // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象（一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj
  }

  // 测试：
  function Foo(name) {
    this.name = name
  }
  const newObj = myNew(Foo, 'zhangsan')
  console.log(newObj)                 // Foo {name: "zhangsan"}
  console.log(newObj instanceof Foo)