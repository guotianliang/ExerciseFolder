class Compile {
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);

        // 把模板中的内容移到片段中去操作
        this.$fragment = this.node2Fragment(this.$el)
        console.log(this.$fragment)
        // 执行编译
        this.compile(this.$fragment)
        // 放回$el中
        this.$el.appendChild(this.$fragment)
    }
    node2Fragment(el){
        // 创建片段
        const fragment = document.createDocumentFragment()
        //
        let child;
        while(child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el){
        const childNodes = el.childNodes;
        // childNodes是一个类数组
        Array.from(childNodes).forEach(node => {
            if(node.nodeType == 1){
                // 元素
                // console.log('编译元素'+node.nodeName);

                // 编译元素
                this.compileElement(node)
            }else if(this.isInter(node)){
                // 只关心{{xxx}}
                // console.log('编译插值文本' + node.textContent);

                // 编译文本
                this.compileText(node)
            }

            // 递归子节点
            if(node.children && node.childNodes.length > 0){
                this.compile(node)
            }
        })
    }
    isInter(node){
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 文本替换
    compileText(node){
        console.log(RegExp.$1);
        console.log(this.$vm,this.$vm.$data[RegExp.$1]);

        // 表达式
        const exp = RegExp.$1
        this.update(node, exp, 'text') // 等同于t-text
    }
    compileElement(node){
        // 关心属性
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // 规定：k-xxx="yyy"
            const attrName = attr.name; // k-xxx
            const exp = attr.value; // yyy
            if(attrName.startsWith('v-')){
                // 指令
                const dir = attrName.substring(2) // xxx
                // 执行
                console.log(dir,node,exp,71)
                this[dir] && this[dir](node, exp);
                console.log(attr)
                node.removeAttribute(attr.name);
            }
        })
    }
    update(node, exp, dir){

        const updator = this[dir+'Updator']
        updator && updator(node, this.$vm.$data[exp]) // 首次初始化
        // 创建Watcher实例，依赖收集完成了

        new Watcher(this.$vm, exp, function(value){
            updator && updator(node, value)
        })
        console.log('依赖收集',87)
    }
    textUpdator(node, value){
        node.textContent = value;
    }
    text(node, value){
        node.textContent = this.$vm.$data[value];
    }

}