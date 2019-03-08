const CopyPlugin = require('copy-webpack-plugin');
const {
    join
} = require('path')
module.exports = {
    plugins: [
        // to 是相对于output
        new CopyPlugin([
            {
                from: join(__dirname,"../","/src/web/views/common/layout.html"),
                to: '../views/common/layout.html'
            },
            {
                from: join(__dirname,"../","/src/web/components"),
                to: '../components'
            },
        ],{
            copyUnmodified: true,   // 没有变在调试阶段不传递
            ignore: ["*.js","*.css"]
        })
    ]
}