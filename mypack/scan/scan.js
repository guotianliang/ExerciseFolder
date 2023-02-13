// env node
const fs = require("fs");
// const parser = require('@babel/parser');
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const generate = require("@babel/generator").default;
const { Buffer } = require("buffer");
const filename = "./demo.js";
const content = fs.readFileSync(filename, "utf-8");
const ast = parse(content, {
	sourceType: "module"
});
let paths = {};
// 对特定节点进行操作  进入/退出/node types
traverse(ast, {
	enter(path) {
		findLogExpressions(path.node, path.parent);
		// if(path.node.callee&&path.node.callee.name==='$$'){
		//     findLogExpressions(path.node);
		//     // path.node.callee.name ="@@";
		// }
	}
});
function findLogExpressions(node, parent) {
	if (parent.isLog || node.callee?.name && node.callee.name === "$$") {
		getCalleeAndTags(node);
		node.isLog = true;
		return true;
	}
	return false;
	// console.log(node);
	// let code = generate(node).code;
	// // console.log(node.arguments);
	// console.log(node.callee.object?.callee,"== node.callee.object?.callee");
	// node.arguments.map(v=>{
	//     getArgumentsNodeValue(v, node?.callee?.property?.name, code);
	// });
}
function getArgumentsNodeValue(node, key, code) {
	console.log(key, code);
	let value = generate(node).code;
	return value;
}
// 获取节点的调用栈和标签
function getCalleeAndTags(node) {
	const tags = [];
	const tracking = {
		callee: [],
		keys: [],
		arguments: []
	};

	const code = generate(node).code;

	parseNodeCallee(node, tracking, tags, code);
	console.log(tracking, "==tracking");
	// 修正顺序
	tracking.callee = tracking.keys
		.map((key, index) => {
			return {
				key,
				arguments: tracking.arguments[index]
			};
		})
		.reverse();

	// consola.log(
	//     this.tag +
	//         '.' +
	//         tracking.callee
	//             .map((c) => {
	//                 return `${c.key}(${c.arguments?.join(',')})`;
	//             })
	//             .join('.'),
	// );

	return {
		callee: tracking.callee,
		tags: tags || [],
		code
	};
}
// 递归解析$$链式调用栈
function parseNodeCallee(node, tracking, tags, code) {
	if (node.callee?.property) {
		tracking.keys.push(node.callee.property.name);
	}

	// 获取$$链式调用函数的参数
	if (node.arguments) {
		const args = node.arguments.map((i) => {
			return getArgumentsNodeValue(i, node?.callee?.property?.name, code);
		});

		tracking.arguments.push(args);
	} else {
		tracking.arguments.push("");
	}

	if (node.callee?.object?.callee) {
		parseNodeCallee(node.callee.object, tracking, tags, code);
	} else {
		// 获取$$()内参数，即tags
		// if (node.callee.name === tag) {
		//     if (node.arguments) {
		node.arguments?.forEach((arg) => {
			tags.push(getArgumentsNodeValue(arg));
		});
		//     }
		// }
	}
}
// let code = generate(ast);
// console.log(code);

// fs.writeFileSync('./demo.js',code.code);
// console.log(ast);
let aa = {
	level: 0,
	children: [
		{
			level: "0_1",
			children: []
		}
	]
};
