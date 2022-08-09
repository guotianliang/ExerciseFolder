const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function stepOne(filename){
  const content = fs.readFileSync(filename,'utf-8')
  const ast = parser.parse(content,{
    sourceType:'module'
  })
  console.log(ast)
  const dependencies = {}
  traverse(ast,{
    ImportDeclaration({node}){
        const dirname = path.dirname(filename)
        console.log(node)
        const newFile = './' + path.join(dirname, node.source.value)
        //保存所依赖的模块
        dependencies[node.source.value] = newFile
    }
  })
  const {code} = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  return{
    filename,//该文件名
    dependencies,//该文件所依赖的模块集合(键值对存储)
    code//转换后的代码
  }
}

function stepTwo(entry){
  const entryMoudle = stepOne(entry)
  const graphArray=[entryMoudle]
  for(let i=0;i<graphArray.length;i++){
    const item =graphArray[i]
    const {dependencies} =item
    for(let j in dependencies){
      graphArray.push(stepOne(dependencies[j]))
    }
  }
  const graph = {}
  graphArray.forEach(item=>{
    graph[item.filename]={
      dependencies:item.dependencies,
      code:item.code
    }
  })
  return graph
}


function step3(entry){
  const graph = JSON.stringify(stepTwo(entry))
  return `
    (function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code)
        return exports
      }
      require('${entry}')
    })(${graph})
  `
}
const code = step3('./index.js')
console.log(path.join(path.dirname('./index.js'),'test.js'),"===")
fs.writeFileSync('./'+path.join(path.dirname('./index.js'),'test.js'),code)