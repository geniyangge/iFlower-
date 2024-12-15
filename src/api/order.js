/**
 * 订单模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store/index.js';

// 项目ID
import { project_id } from '@/config';

/**
 * 添加订单
 *  - post请求
 */
export async function addOrderAPI(data) {
    data = { ...{ project_id }, ...data };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.getters.token,
    };
    return await myAxios({
        method: 'post',
        url: '/order',
        headers,
        data,
    });
}

/**
 * 获取订单列表
 *  - get请求
 */
export async function getOrderListAPI(params) {
    params = { ...{ project_id }, ...params };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.getters.token,
    };
    return await myAxios({
        method: 'get',
        url: '/order',
        headers,
        params,
    });
}

/**
 * 获取订单单条信息
 *  - get请求
 */
export async function getOrderAPI(id) {
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.getters.token,
    };
    return await myAxios({
        method: 'get',
        url: '/order/' + id,
        headers,
    });
}

/**
 * 删除订单
 *  - delete请求
 */
export async function deleteOrderAPI(id) {
    if (!id) return;
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.getters.token,
    };
    return await myAxios({
        method: 'delete',
        url: '/order/' + id,
        headers,
    });
}