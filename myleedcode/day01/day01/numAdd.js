var twoSum = function(nums, target) {
    let start=0;

    let end = nums.length-1;
    while(start!==nums.length-1){
        if(start == end){
            start++;
            end = nums.length-1;
        }
        if(nums[start]+nums[end]==target){
            break;
        }else{
            end--
        }

    }
    return [start,end]

};
// var twoSum = function(nums, target) {
//     let i = nums.length;
//     while(i > 1) {
//         let last = nums.pop();
//         if (nums.indexOf(target - last) > -1) {
//             return [nums.indexOf(target - last), nums.length]
//         }
//         i--
//     }
// };
console.log(twoSum([3, 3] ,6))