/**
 * 订单模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store/index.js';

// 项目ID
const project_id = "337";

/**
 * 添加订单
 *  - post请求
 */
export async function addOrderAPI(data) {
    data = { ...{ project_id }, ...data };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/order',
        headers,
        data,
    });
}