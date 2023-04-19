/**
 * 购物车模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

// 项目ID
const project_id = "337";

/**
 * 添加商品到购物车
 *  - post请求
 *  data === {
 *      goods_id: 361, // 商品ID
 *      num: 1,        // 数量
 *  }
 */
export async function addGoodsToCart(data) {
    data = { ...{ project_id }, ...data };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/shoppingCart',
        headers,
        data,
    });
}

/**
 * 获取自己的购物车信息
 *  - get请求
 */
export async function getUserCartInfo() {
    let params = { project_id };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'get',
        url: '/shoppingCart',
        headers,
        params,
    });
}

/**
 * 更新购物车内某条商品
 *  - put请求
 */
export async function updateCartGood(data) {
    if (!data.id) return console.log('api/cart.js', '请携带商品id');
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    let id = data.id;
    delete data.id;
    return await myAxios({
        method: 'put',
        url: '/shoppingCart/' + id,
        headers,
        data,
    });
}

/**
 * 删除购物车的一条商品
 *  - delete请求
 */
export async function deleteCartGood(id) {
    let data = { project_id };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'delete',
        url: '/shoppingCart/' + id,
        data,
    });
}