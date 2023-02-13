function aa(){

    console.log(123,456);
}
function bb(){
    console.log(7777777777777);
}
// Function.prototype.before=function(cb){
//     cb();
//     return this;
// };
// Function.prototype.before=function(cb){
//   cb();
//   return this;
// }
aa.before(bb);
aa();
aa.after(bb);