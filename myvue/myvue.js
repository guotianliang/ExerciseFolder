class Vue{
    constructor(options){
        this.$options = options;
        this.el=document.querySelector(options.el);
        this.$data=options.data;

        this.observe(this.$data);
        new Compile(options.el, this);
        // 响应化处理--数据的拦截处理

    }
     // 在vue根上定义属性代理data中的数据
     proxyData(key){
        // this指的就是KVue的实例
        console.log("proxyData被执行")
        Object.defineProperty(this, key, {
            get(){
                console.log("proxyData的get被触发了")
                return this.$data[key]
            },
            set(newVal){
                console.log("proxyData的set被触发了")
                this.$data[key] = newVal
            }
        })
    }
    observe(value){
        if(!value || typeof value !== 'object'){
            return
        }
        // 遍历
        Object.keys(value).forEach(key => {
            // 响应式处理
            // {msg: "你好"} "msg" "你好"
            this.defineReactive(value, key, value[key])

            // 代理data中的数据到vue根上
            this.proxyData(key);
        })

    }

    defineReactive(obj, key, val){
        // 递归
        this.observe(val)

        // 定义了一个Dep
        const dep = new Dep() // 每个dep的实例和data中每个key有一对一关系
        // 给obj的每一个key定义拦截
        Object.defineProperty(obj, key, {
            get(){
                // 依赖收集

                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal){
                if(newVal !== val){
                    console.log("defineReactive被触发了")
                    val = newVal;
                    // console.log(key + '：属性更新了');
                    dep.notify()
                }
            }
        })
    }
}
class Dep {
    constructor(){
        // 存储所有依赖
        this.watcher = []
    }

    addDep(watcher){
        this.watcher.push(watcher)
    }

    notify(){
        console.log(this,60)
        this.watcher.forEach(watcher => watcher.update())
    }
}
class Watcher{
    constructor(vm, key, cb){

        // 创建实例时，立刻将该实例指向Dep.target便于依赖收集
        Dep.target = this;
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;
        this.vm[this.key]; // 触发依赖收集
        Dep.target = null;
    }

    // 更新
    update() {
        // console.log(this.key + '更新了！');
        this.cb.call(this.vm, this.vm[this.key])
    }
}
