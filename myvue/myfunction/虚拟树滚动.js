const tree = [
]

// 将树组件打平 深度优先

function flatTree(tree,treeCopy){
  tree.forEach(v => {
    treeCopy.push(v)
    if(v.children?.length){
      flatTree(v.children,treeCopy)
    }
  });
  return treeCopy
}
// let treeCopy = [];
// treeCopy = flatTree(tree,treeCopy)
// console.log(treeCopy)