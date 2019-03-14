目录
-------------------

      assets/             静态文件
      bin/                可执行文件
      components/         组件
      config/             配置文件，可以配置线上线下的环境
      controllers/        路由，这里处理了请求路由
      docs/               jsdoc通过JS注释生成的文档
      logs/               log日志
      middlewares/        中间件，这里主要处理了错误中间件
      models/             数据模型层，主要是一些后端接口的请求
      php/                php代码
      tests/              测试相关
      utils/              utils，封装了原生的fetch方法，对url和catch做一些处理
      views/              view页面


### 流程
1. app.js
2. controller
3. render页面，views，用的是swig
4. views里面的页面是拼接了components和assets静态文件的页面
5. assets静态文件中的js，通过type="module"来判断浏览器是否支持es6
6. es6编译通过.babelrc文件来定义，通过babel命令来编译es6文件为es5
7. 在yd.js里面做了节流（throttle方法）

### 配置打包工具
#### gulp打包node端代码
1. gulpfile
2. 配置完需要给权限
3. 排除config文件执行babel
4. rollup-plugin-replace替换环境变量出现if(true)/if(false)
5. 使用gulp-rollup清楚无用代码
6. gulp-eslint配置
7. 配置eslint https://eslint.org/

#### webpack打包web端代码（11727）
8. 在src/web文件夹下放入components和view
9. 创建config 开发环境和生产环境
10. webpack.config.js主要是做entry
11. 写prod的webpack文件
12. 写webpack plugin

#### 落地SSR切页SPA
1. 利用pjax(https://github.com/defunkt/jquery-pjax)
2. 还需要页面对应的css、js(用low的方法是，服务器渲染页面，然后在页面中提取)
3. IntersectionObserver监听
4. quicklink提高页面性能

##### 性能优化
- 应该是可见可操作 渲染全部是a标签
- SSR直出 前端路由 -》 数据 -》 CSR
- SSR（SEO、FCP）

#### 前端架构
1. DI
2. IOC控制反转
 AOP constructor(indexService){
       this.indexService = indexService
 }
3. IOC容器概念
4. container.loadModules加载进来（第一种方式，直接在app.js里面实现）
5. new 单例（第二种方式，在service里面直接实现）
6. service注册在app.js
      使用：constructor({indexService}) {
        this.indexService = indexService
    }
7. controller容器记得路径要对


#### 其它
- dom diff 不快
- 常规方案下，vue是前端渲染，pjax是后端渲染。
- 看一下 gulp 和 webpack 是否在监听中
- 改造gulpfile，兼容修饰器

#### Node
- Node
      - BFF（前后端分离）
      - 部署（Doker+运维）
      - 监控（Node+前端）
            - 性能
            - 错误
- 前端
      - 工程化
      - CI 持续集成 Jenkins……
      - 框架选型（扩展）
- SSR CSR SSR+CSR A+B微前端