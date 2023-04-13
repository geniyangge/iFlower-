// 引入axios
import axios from 'axios';
import { handlerNetworkErr } from './handlerAxios';

// 创建实例时配置默认值
const myAxios = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    responseType: 'json',
});

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return [response, null];
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error.response);
    // 保存错误状态码和错误信息
    let errInfo = {
        status: error.response?.status,
        msg: error.response?.data?.msg
    };
    // 处理错误信息
    handlerNetworkErr(errInfo);
    return [null, error];
});

window.addEventListener("err", () => {
    console.log(1);
});

export default myAxios;

