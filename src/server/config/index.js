// const {
//     join
// } = require("path");
// const _ = require("lodash");
import {
    join
} from 'path';
import _ from 'lodash-es';
let config = {
    "viewDir": join(__dirname, "..", "views"),
    "staticDir": join(__dirname, "..", "assets"),
}
if(false){
    console.log('xxx')
}
if (process.env.NODE_ENV === "development") {
    const localConfig = {
        baseURL:"http://localhost/index.php?r=",
        cacheMode:false,
        port: 8888
    }
    config = _.extend(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
    const prodConfig = {
        cacheMode:"memory",
        port: 8081
    }
    config = _.extend(config, prodConfig);
}
module.exports = config;
//Map