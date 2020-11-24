function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype = {
    show: function () {
        console.log(this.data);
    }
}

function Tree() {
    this.root = null;
}

Tree.prototype = {
    insert: function (data) {
        var node = new Node(data, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }
        var current = this.root;
        var parent = null;
        while (current) {
            parent = current;
            if (data < parent.data) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }

        }
    },
    preOrder: function (node) {
        if (node) {
            node.show();
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    },
    middleOrder: function (node) {
        if (node) {
            this.middleOrder(node.left);
            node.show();
            this.middleOrder(node.right);
        }
    },
    laterOrder: function (node) {
        if (node) {
            this.laterOrder(node.left);
            this.laterOrder(node.right);
            node.show();
        }
    },
    getMin: function () {
        var current = this.root;
        while(current){
            if(!current.left){
                return current;
            }
            current = current.left;
        }
    },
    getMax: function () {
        var current = this.root;
        while(current){
            if(!current.right){
                return current;
            }
            current = current.right;
        }
    },
    getDeep: function (node,deep) {
        deep = deep || 0;
        if(node == null){
            return deep;
        }
        deep++;
        var dleft = this.getDeep(node.left,deep);
        var dright = this.getDeep(node.right,deep);
        return Math.max(dleft,dright);
    }
}