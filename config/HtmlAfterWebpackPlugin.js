// 1. 寻找何时才能拦截最后生成的swig
// 2. 如何分清这个swig文件对应的JS和CSS
const pluginName = 'HtmlAfterWebpackPlugin';
const assetHelp = (data) => {
    let js = [];
    let css = [];
    const dir = {
        js: item => `<script class="layload-js" src="${item}"></script>`,
        css: item => `<link class="layload-css" rel="stylesheet" href="${item}">`
    }
    for(let jsitem of data.js){
        js.push(dir.js(jsitem))
    }
    for(let cssitem of data.css){
        css.push(dir.css(cssitem))
    }
    return {
        js,
        css
    }
}
class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      // tap 相当于调用生命周期
      // 注意这个顺序，要在最后
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData=>{
        console.log('🍎🍎🍎🍎🍎The webpack build process is starting!!!');
        let _html = htmlPluginData.html;
        const result = assetHelp(htmlPluginData.assets)
        // console.log(_html)
        _html = _html.replace(/pages:/g,"../../")
        _html = _html.replace(/components:/g,"../../../components/")
        _html = _html.replace("<!--injectjs-->",result.js.join(""))
        _html = _html.replace("<!--injectcss-->",result.css.join(""))
        // console.log(_html)
        htmlPluginData.html = _html
      })
    });
  }
}
module.exports = HtmlAfterWebpackPlugin;