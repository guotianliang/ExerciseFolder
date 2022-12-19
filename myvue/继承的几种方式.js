// 基于原型链的继承
function SuperFn(){
}
SuperFn.prototype.name="我是prototype上的";
SuperFn.prototype.say=function (){
    console.log("haha");
};
function SuberFn(){}
SuberFn.prototype = new SuperFn();
SuberFn.prototype.constract=SuberFn;

let mysuber = new SuberFn();

console.log(mysuber.name);
mysuber.say();

// 缺点：当某一个实例修改原型链上某一个属性时，如果实例类型是引用类型，那么其它实例的属性也会被修改。

// 基于call的继承
// function suberFn(){
//     superFn.call(this,'参数');
// }
// 缺点：继承不了原型链上的属性和方法

// 基于组合继承

function createObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
//继承原型属性 即原型式继承
function create(parent, child) {
    var f = createObj(parent.prototype);//获取原型对象

    child.prototype = f;
    child.prototype.constructor = child;//增强对象原型，即保持原有constructor指向
}

function Parent(name) {
    this.name = name;
    this.arr = ['brother', 'sister', 'parents'];
}
Parent.prototype.run = function () {
    return this.name;
};
function Child(name, age) {
    // 示例属性
    Parent.call(this, name);
    this.age = age;
}
// 原型属性继承寄生于该方法中
create(Parent.prototype,Child);
var child1 = new Child('trigkit4', 21);