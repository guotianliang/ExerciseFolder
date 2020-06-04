/**
 * 1.npm install --save-dev @babel/core
 * 2.配置文件.babelrc {
  "presets": [],  转码规则
  "plugins": []   插件
    }
    npm install --save-dev @babel/preset-env
 * 3.命令行转码 npm install --save-dev @babel/cli
 * 4.npm install --save-dev @babel/register 不用手动es6
 *
 */

let a=11;
dunc= (name)=>{
    console.log(name)
}
const cc=12;
arra=[[1,3],[3,6]];
bb=[2,4];
function chunk(arr, size) {
    const list = [];
    let current = [];
    arr.forEach(t => {
        current.push(t);
        if (current.length === size) {
            list.push(current);
            current = [];
        }
    });
    if (current.length) {
        list.push(current);
    }
    return list;
}
function arrmaker(value,arr){
    var arrcope = [];
    arr.map((item,index)=>{
       arrcope=[...item,...value];
       arrcope.flat();
       arrcope.sort((a,b)=>{
           return a-b
       });
       arrcope = arrfill(arrcope,value);

       console.log(arrcope);
       arrcope= chunk(arrcope,2);
       item=arrcope;
       return item
    })
    return arr
}
function arrfill(value,target=[1,2]){
    num1=value.indexOf(target[0]);
    num2=value.indexOf(target[1]);
    if((num1+1)===num2){
        return value
    }else if(num1+2<num2){
        value.fill(target[0],num1,num2)
        value.fill(target[1],num2-1,num2)
    }else{
        value.fill(target[0],num1,num2)
    }
    return value
}
for(var _i=0;_i<10;_i++){
    setTimeout(() => {
        console.log(_i)
    }, 0);
}