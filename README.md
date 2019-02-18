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


###流程
1. app.js
2. controller
3. render页面，views，用的是swig
4. views里面的页面是拼接了components和assets静态文件的页面
5. assets静态文件中的js，通过type="module"来判断浏览器是否支持es6
6. es6编译通过.babelrc文件来定义，通过babel命令来编译es6文件为es5
7. 在yd.js里面做了节流（throttle方法）