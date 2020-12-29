// bind返回一个函数 可以延迟执行 而call 和 apply 是立即执行
/**
 *  1.bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
    2.new会改变this指向：如果bind绑定后的函数被new了，那么this指向会发生改变，指向当前函数的实例
    3.没有保留原函数在原型链上的属性和方法
 */
Function.prototype.myBind = function (thisArg, ...args) {
    var self = this
    // new优先级
    var fbound = function () {
        console.log(Array.prototype.slice.call(arguments))
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
    }
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype);

    return fbound;
}
const obj = { name: '写代码像蔡徐抻' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

// fn2.myBind(obj, '456')();
foo.myBind(obj, 'a', 'b', 'c')();
