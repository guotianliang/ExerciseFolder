"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 1.npm install --save-dev @babel/core
 * 2.配置文件.babelrc {
  "presets": [],  转码规则
  "plugins": []   插件
    }
    npm install --save-dev @babel/preset-env
 * 3.命令行转码 npm install --save-dev @babel/cli
 * 4.npm install --save-dev @babel/register 不用手动es6
 *
 */
var a = 11;

dunc = function dunc(name) {
  console.log(name);
};

var cc = 12;
arra = [[1, 3], [3, 6]];
bb = [2, 4];

function chunk(arr, size) {
  var list = [];
  var current = [];
  arr.forEach(function (t) {
    current.push(t);

    if (current.length === size) {
      list.push(current);
      current = [];
    }
  });

  if (current.length) {
    list.push(current);
  }

  return list;
}

function arrmaker(value, arr) {
  var arrcope = [];
  arr.map(function (item, index) {
    arrcope = [].concat(_toConsumableArray(item), _toConsumableArray(value));
    arrcope.flat();
    arrcope.sort(function (a, b) {
      return a - b;
    });
    arrcope = arrfill(arrcope, value);
    console.log(arrcope);
    arrcope = chunk(arrcope, 2);
    item = arrcope;
    return item;
  });
  return arr;
}

function arrfill(value) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1, 2];
  num1 = value.indexOf(target[0]);
  num2 = value.indexOf(target[1]);

  if (num1 + 1 === num2) {
    return value;
  } else if (num1 + 2 < num2) {
    value.fill(target[0], num1, num2);
    value.fill(target[1], num2 - 1, num2);
  } else {
    value.fill(target[0], num1, num2);
  }

  return value;
}

var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  }, 0);
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
