let lineList={
    1:[1],
    2:[1,1]
};
var generate = function(numRows) {
    if(!numRows){
        return [];
    }
    let target=[];
    let start=3;
    while(start<numRows+1){
        let mid=[];
        let point=0;
        let arr=lineList[start-1];
        let length=arr.length;
        while(point<length-1){
            mid.push(arr[point]+arr[point+1])
            point++
        }
        lineList[start]=[1,...mid,1];
        start++
    }

    for (let k in lineList){
        k<=numRows&&target.push(lineList[k])
    }
    return target
};
var generate = function(numRows) {
    let ret=[]
    for(let i=0;i<numRows;i++){
        let arr=new Array(i+1).fill(1);
        for(let j=1;j<arr.length-1;j++){
            arr[j]=ret[i-1][j-1]+ret[i-1][j]
        }
        ret.push(arr);
    }
    return ret
}