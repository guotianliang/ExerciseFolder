const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const generate = require('@babel/generator').default;
const { Buffer } = require('buffer');
const filename = './demo.js';
const content = fs.readFileSync(filename,'utf-8');
const ast = parser.parse(content,{
    sourceType:'module'
});
let paths = {};
traverse(ast, {
    enter(node, parent) {
        // paths = path;
        try{
            let code = generate(node).code;
            console.log(`${code}`);
        }catch{
            console.log(123);
        }
        // console.log(node,parent);
    }
    // CallExpression: (path) => {
    //     consola.log('>>>',generate(path.node).code);
    // },
});
// generate(ast);

// fs.writeFileSync('./test.json',paths);
// console.log(ast);
