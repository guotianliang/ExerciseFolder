const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: ExtractTextPlugin.extract({
        //   // 转换 .css 文件需要使用的 Loader
        //   use: ['css-loader'],
        // }),
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Custom template',
    }),
    new MiniCssExtractPlugin(
      {
        filename: `[name]-[hash:8].css`,
      }
    ),
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: `[name]-[hash:8].css`,
    // }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./2配置.txt",to:""},
      ],
    }),
  ]
};