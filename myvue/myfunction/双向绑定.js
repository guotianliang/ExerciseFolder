function pushTarget (target: ?Watcher) {
    targetStack.push(target)
    Dep.target = target
}
function popTarget () {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
  }
Dep.target = null
const targetStack = []

class Watch{
    constructor(vm,expOrFn,cb){
        this.vm = vm
        vm._watchers.push(this);
        this.expression = expOrFn.toString();
        this.getter = expOrFn
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.value =  this.get();
    }
    get () {
        pushTarget(this)
        let value
        const vm = this.vm

        value = this.getter.call(vm, vm)
        popTarget()
        this.cleanupDeps()
        return value
    }
    cleanupDeps () {
        let i = this.deps.length
        while (i--) {
          const dep = this.deps[i]
          if (!this.newDepIds.has(dep.id)) {
            dep.removeSub(this)
          }
        }
        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
      }
}
class Dep{
    constructor(){

    }
}
class Observe{
    constructor(){

    }
}
function Vue(options){
    this._init(options)
}
Vue._init=function (options){

}