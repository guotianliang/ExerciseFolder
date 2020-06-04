/**
 *  选取基准元素
    比基准元素小的元素放到左边，大的放右边
    在左右子数组中重复步骤一二，直到数组只剩下一个元素
    向上逐级合并数组
 *
 */
function quickSort(arr) {
    if(arr.length <= 1) return arr          //递归终止条件
    const pivot = arr.length / 2 | 0        //基准点
    const pivotValue = arr.splice(pivot, 1)[0]
    const leftArr = []
    const rightArr = []
    arr.forEach(val => {
        val > pivotValue ? rightArr.push(val) : leftArr.push(val)
    })
    return [ ...quickSort(leftArr), pivotValue, ...quickSort(rightArr)]
}
var arr = [3,6,5,1,2]
abb =quickSort(arr);
  console.log(abb,arr)
