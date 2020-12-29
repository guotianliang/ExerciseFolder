/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// https://leetcode-cn.com/problems/isomorphic-strings/comments/
var isIsomorphic = function(s, t) {
    var target = t;
    var obj={};
    var tragetobj={};
    var sgin = 'a'
    for (let i =0;i<s.length;i++){
        let key = s.charAt(i);
        if(!obj[key+sgin]){
            obj[key+sgin]=[];
            let x = s.indexOf(key);
            while(x!=-1){
                obj[key+sgin].push(x);
                x = s.indexOf(key,x + 1);
            }
        }
    }
    for (let i =0;i<target.length;i++){
        let key = target.charAt(i);
        console.log(key)
        if(!tragetobj[key+sgin]){
            tragetobj[key+sgin]=[];
            let x = target.indexOf(key);
            while(x!=-1){
                tragetobj[key+sgin].push(x);
                x = target.indexOf(key,x + 1);
            }
        }
    }
    var len = Object.keys(obj);
    var tragetobjlen = Object.keys(tragetobj);

    if(len.length!=tragetobjlen.length){
        return false
    }
    let flag=true;
    len.forEach((item,index) => {
        let lstr = obj[item].join('');
        let rstr = tragetobj[tragetobjlen[index]].join('');
        console.log(item,lstr,obj,rstr,tragetobj)
        rstr!=lstr&&(flag=false);
    });
    return flag
 };
 console.log(isIsomorphic("13","42"))
//  优化 hash
var isIsomorphic = function(s, t) {
    for(let i=0;i<s.length;i++){
        if(s.indexOf(s[i])!=t.indexOf(t[i])){
            return false;
        }
    }
    return true
}