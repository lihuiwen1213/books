"use strict";

const fetch = require("node-fetch");

const config = require("../config");
/**
 * 重写fetch，做一些封装
 */


class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseURL = config.baseURL;
  }

  fetch(options) {
    let ydfetch = '';

    if (options.params) {
      ydfetch = fetch(this.baseURL + this.url, {
        method: options.method,
        body: options.params
      });
    } else {
      ydfetch = fetch(this.baseURL + this.url);
    }

    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: "",
        data: []
      };
      ydfetch.then(res => res.json()).then(json => {
        result.data = json;
        resolve(result);
      }).catch(error => {
        result.code = 1;
        result.message = "node-fetch和后端通讯异常";
        reject(result);
      });
    });
  }

}

module.exports = SafeRequest;