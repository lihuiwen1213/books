'use strict';
console.log()
const {
    join
} = require("path");
const _ = require("lodash");
// import {
//     join
// } from 'path';
// import _ from 'lodash-es';
let config = {
    "viewDir": join(__dirname, "..", "views"),
    "staticDir": join(__dirname, "..", "assets"),
};
{
    const prodConfig = {
        cacheMode:"memory",
        port: 8081
    };
    config = _.extend(config, prodConfig);
}
module.exports = config;
//Map
