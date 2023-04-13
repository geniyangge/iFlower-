// 该文件用于将状态码转换为提示信息

// 引入vant组件
import { Notify } from 'vant';

const errNetworkStatus = {
    409: '该手机号码已注册',
    400: '参数phone格式不对或者缺失',
};

export const handlerNetworkErr = errInfo => {
    let { status, msg } = errInfo;
    console.log(status, msg);
    Notify({
        message: errNetworkStatus[status] || msg || '未知的错误',
        duration: 2000,
        type: 'danger',
    });
};