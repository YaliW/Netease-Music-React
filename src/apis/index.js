import axios from 'axios' // Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
import querystring from 'querystring' // ?
import commonApis from './common.js';

const TIMEOUT = 5000;

const modifyParams = (method, data, baseInfo) => {
    return new Promise(resolve => {
      const param = { ...data, ...baseInfo }
      const isGet = method.toUpperCase() === 'GET'
      const key = isGet ? 'params' : 'data'
      const value = isGet ? param : querystring.stringify(param)
  
      resolve({ [key]: value })
    })
  }

export default function fetchAPI(api, body) {
    return modifyParams(api.method, body, {}).then((params) => axios.request({
        url: api.url,
        method: api.method,
        timeout: TIMEOUT,
        ...params
    }));
}

export const apis = {
    ...commonApis
};