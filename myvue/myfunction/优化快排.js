/**
 *
 * @param {Array} arr
 * @param {Number} left
 * @param {Number} right
 *
 * 存在问题
 *  1.有序数组的情况：如果输入的数组是有序的，而取基准点时也顺序取，就可能导致基准点一侧的子数组一直为空, 使时间复杂度退化到O(n2)
    2.大量重复数据的情况：例如输入的数据是[1,2,2,2,2,3], 无论基准点取1、2还是3, 都会导致基准点两侧数组大小不平衡, 影响快排效率
 *
 * [5,1,4,2,3]               pos
 * 第一次运行[5,1,4,2,3] 5>3  -1
 *          [5,1,4,2,3] 1<3  0   [1,5,4,2,3]
 *          [1,5,4,2,3] 4>3  0
 *          [1,5,4,2,3] 2>3  1   [1,2,4,5,3]
 *          [1,2,4,5,3] 3>=3 2   [1,2,3,5,4]
 *
 */
function quickSort(arr, left, right) {          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
    if (left < right) {
        let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
        for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
            let pivot = arr[right]              //选取数组最后一位作为基准数，
            if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
                pos++

                let temp = arr[pos]
                arr[pos] = arr[i]
                arr[i] = temp
            }
        }
        //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
        quickSort(arr, left, pos - 1)
        quickSort(arr, pos + 1, right)
    }
    return arr      //数组只包含1或0个元素时(即left>=right)，递归终止
}