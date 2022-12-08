Function.prototype.mycall=function (thisarg,...arg){
    const fn= Symbol('fn');
    const thisArg = thisarg || window;
    thisarg[fn] = this;
    console.log(thisarg[fn])
    console.log(arg)
    const result=thisarg[fn](...arg);
    delete thisarg[fn];
      return result
}
const obj={name:"123"};
function foo(){
    console.log(this.name);
    return 456
}
const aa = foo.mycall(obj,123)
console.log(aa)

myCall = function (obj,...args){
  const fn= Symbol('fn');
  obj[fn] = this;
  result = obj[fn](...args)
  delete obj[fn]
  return result

}