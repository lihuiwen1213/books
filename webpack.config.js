const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const merge = require('webpack-merge');
const glob = require('glob')
const files = glob.sync('./src/web/views/**/*.entry.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin')
// console.log("🍎",files)
// 15:09
// [ './src/web/views/books/books-add.entry.js',
//   './src/web/views/books/books-list.entry.js' ]
// {
//     "books-add": "./src/web/views/books/books-add.entry.js",
//     "books-list": "./src/web/views/books/books-list.entry.js",
// }
const _entry = {};
const _plugins = [];
for (let item of files) {
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        // console.log('🍎🍎🍎🍎🍎',RegExp.$1)
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        _plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/web/views/${dist}/pages/${template}.html`,
            chunks: [entryKey],
            inject: false
        }))
    }
    // console.log(item)
}
// console.log(_plugins)
let webpackconfig = {
    entry: _entry,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
        new HtmlAfterWebpackPlugin()
    ]
}
module.exports = merge(webpackconfig, _mergeConfig)