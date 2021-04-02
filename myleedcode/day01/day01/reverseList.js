// 反转链表
var reverseList = function(head) {
    if (!head)
        return null;
    let pre = null, cur = head;
    while (cur) {
        // 关键: 保存下一个节点的值
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
console.log(reverseList([1,2,3,4,5]))
// 区间反转链表
