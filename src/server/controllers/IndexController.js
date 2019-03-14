import cheerio from 'cheerio';
import {
    route,
    GET
} from 'awilix-koa'
const {
    URLSearchParams
} = require("url");
@route('/index')
class IndexController {
    // aop
    constructor({indexService}) {
        this.indexService = indexService
    }
    @route('/list')
    @GET()
    async actionIndex(ctx, next) {
        // ctx.body = 'hello'
        // const index = new Index();
        // const result = await index.getData();
        // const html = await ctx.render("books/pages/list", {
        //     data: result.data
        // });

        const html = await ctx.render("books/pages/list");
        const getTest = await this.indexService.getTest()
        //SSR
        // console.log('fd',ctx.request.header['x-pjax'])
        // console.log('getTest::::',getTest)
        if (ctx.request.header['x-pjax']) {
            const $ = cheerio.load(html);
            ctx.body = $('#js-books-data').html()
        } else {
            ctx.body = html;
        }
    }
    @route('/add')
    @GET()
    async actionAdd(ctx, next) {
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
    }
    @route('/save')
    @GET()
    async actionSave(ctx, next) {
        const index = new Index();
        const params = new URLSearchParams();
        params.append("Books[name]", "测试");
        params.append("Books[author]", "测试111");
        const result = await index.saveData({
            params
        });
        ctx.body = result;
    }
}
// module.exports = IndexController;
export default IndexController;