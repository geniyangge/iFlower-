/**
 * 用户模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';
// 引入vant组件
import { Notify } from 'vant';

/**
 * 用户注册
 *  - post请求
 */
export async function userRegisterAPI(data) {
    return await myAxios({
        method: 'post',
        url: '/register',
        data,
    });
}

/**
 * 用户登录
 *  - post请求
 */
export async function userLoginAPI(data) {
    return await myAxios({
        method: 'post',
        url: '/login',
        data,
    });
}

/**
 * 更新用户信息
 *  - put请求
 */
export async function updateUserInfoAPI(data) {
    if (!data.id) return Notify({
        message: '请先登录',
        duration: 2000,
    });
    let id = data.id;
    delete data.id;
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'put',
        url: '/user/' + id,
        data,
        headers,
    });
}