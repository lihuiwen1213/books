const Koa = require("koa");
const app = new Koa();
const path = require("path");
const co = require("co");
const render = require('koa-swig');
const serve = require('koa-static');
// const errorHandler = require("./middlewares/errorHandler");
import errorHandler from './middlewares/errorHandler';
const log4js = require('log4js');
const config = require("./config")
import {
    asClass,
    asValue,
    Lifetime,
    createContainer,
} from 'awilix'
import {
    scopePerRequest,
    loadControllers
} from 'awilix-koa'
// process.env.NODE_ENV
app.use(serve(config.staticDir));
// 创造容器的概念
const container = createContainer();
// 所有的service注入到容器中
container.loadModules([__dirname+'/services/*.js'],{
    formatName: "camelCase",
    registerOptions: {
        lifetime: Lifetime.SCOPED
    }
})
app.use(scopePerRequest(container))
//注入我们的路由机制
app.context.render = co.wrap(render({
    root: path.join(config.viewDir),
    autoescape: true,
    cache: config.cacheMode,
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));
//逻辑和业务错误 http日志
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'logs/yd.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
// 自动装载路由
app.use(loadControllers(__dirname+'/controllers/*.js'),{
    cwd: __dirname
})
app.listen(config.port, () => {
    console.log("服务已启动🍺🍞");
});