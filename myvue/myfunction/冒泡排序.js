function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++) {
    let flag = true
      for(let j = 0; j < arr.length - i - 1; j++) {
        if(arr[j] > arr[j+1]) {
          flag = false
          let temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
      // 这个flag的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
      if(flag)break;
    }
    return arr
  }
  var arr = [3,6,5,1]
  bubbleSort(arr);
  console.log(arr)

  function a(){
    this.b=function(){
      console.log(123)
    };
    this.c=2
  }
  function b(){
    a.call(this);
  }
  let c=new b();
  c.b();
console.log(c)
 231
function bubuleSort(arr){
  if(!arr?.length){
    throw new Error("数组为0")
  }
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(arr[j]>arr[j+1]){
        let a =arr[j];
        arr[j] =arr[j+1];
        arr[j+1] =a
      }
    }
  }
  return arr
}