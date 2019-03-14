const Index = require("../models/Index");
import cheerio from 'cheerio';
const {
    URLSearchParams
} = require("url");
class IndexController {
    constructor() {}
    actionIndex() {
        return async (ctx, next) => {
            // ctx.body = 'hello'
            // const index = new Index();
            // const result = await index.getData();
            // const html = await ctx.render("books/pages/list", {
            //     data: result.data
            // });
            const html = await ctx.render("books/pages/list");
            //SSR
            console.log('fd',ctx.request.header['x-pjax'])
            if (ctx.request.header['x-pjax']) {
                const $ = cheerio.load(html);
                ctx.body = $('#js-books-data').html()
            } else {
                ctx.body = html;
            }
        };
    }
    actionAdd() {
        return async (ctx, next) => {
            const html = await ctx.render("books/pages/add");
            if (ctx.request.header['x-pjax']) {
                const $ = cheerio.load(html);
                let _result = "<x-add></x-add>"
                $('.layload-js').each(function(){
                    _result += `<script src="${$(this).attr('src')}"></script>`
                })
                $('.layload-css').each(function(){
                    _result += ` <link rel="stylesheet" href="${$(this).attr('href')}">`
                })
                ctx.body = _result;
            } else {
                ctx.body = html
            }
        };
    }
    actionSave() {
        return async (ctx, next) => {
            const index = new Index();
            const params = new URLSearchParams();
            params.append("Books[name]", "测试");
            params.append("Books[author]", "测试111");
            const result = await index.saveData({
                params
            });
            ctx.body = result;
        };
    }
}
module.exports = IndexController;