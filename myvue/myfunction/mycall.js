Function.prototype.mycall=function (thisarg,...arg){
    const fn= Symbol('fn');
    const thisArg = thisarg || window;
    thisarg[fn] = this;
    const result=thisarg[fn](...arg);
    delete thisarg[fn];
      return result
}
const obj={name:"123"};
function foo(){
    console.log(this.name);
    return 456
}
const aa = foo.mycall(obj)
console.log(aa)