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