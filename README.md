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


dom diff 不快
常规方案下，vue是前端渲染，pjax是后端渲染。
